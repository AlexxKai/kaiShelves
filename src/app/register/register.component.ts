import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, signal, computed, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  NgModel,
} from '@angular/forms';
import * as THREE from 'three';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DatosService } from '../datos.service';
import { Validacionespropias } from '../validacionespropias';

interface NavigationSection {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  private datosService = inject(DatosService);

  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;
  controls!: OrbitControls;

  currentSection = signal<string>('entrance');

  getCurrentSectionName = computed(() => {
    let section = this.navigationSections.find(s => s.id === this.currentSection());
    return section ? section.name : 'Unknown';
  });

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId!: number;

  readonly navigationSections: NavigationSection[] = [
    { id: 'inicio', name: 'Inicio', icon: '🏠' },
    { id: 'register', name: 'Register', icon: '📝🔑' },
    { id: 'entrance', name: 'Entrance', icon: '🚪' },
    { id: 'center', name: 'Centre', icon: '🏛️' },
    { id: 'left', name: 'Left zone', icon: '⬅️' },
    { id: 'right', name: 'Right zone', icon: '➡️' }
  ];

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.createLibrary();
    this.setupEventListeners();
    this.animate();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private cleanup(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);

    if (this.renderer) {
      this.renderer.dispose();
    }

    this.scene?.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material?.dispose();
        }
      }
    });
  }

  private initThreeJS(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.threeContainer.nativeElement.appendChild(this.renderer.domElement);

    this.camera.position.set(0, 8, 20);
    this.camera.lookAt(0, 5, 0);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 100;
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  private createLibrary(): void {
    let floorGeometry = new THREE.PlaneGeometry(60, 60);
    let floorMaterial = new THREE.MeshLambertMaterial({
      color: 0x8b4513,
      transparent: true,
      opacity: 0.9
    });
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    this.createCeiling();
    this.createWalls();
    this.setupLighting();
    this.createCounter();
    this.addDecorations();
  }

  private createCeiling(size = 60): void {
    let ceilingMaterial = new THREE.MeshLambertMaterial({
      color: 0xe8e1d1,
      transparent: true,
      opacity: 0.98
    });
    let ceiling = new THREE.Mesh(new THREE.PlaneGeometry(size, size), ceilingMaterial);
    ceiling.position.set(0, 20, 0);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.receiveShadow = true;
    this.scene.add(ceiling);
  }

  private createWalls(size = 60): void {
    let wallMaterial = new THREE.MeshLambertMaterial({
      color: 0xd2b48c,
      transparent: true,
      opacity: 0.95
    });

    let half = size / 2;
    let height = 20;

    let backWall = new THREE.Mesh(new THREE.PlaneGeometry(size, height), wallMaterial);
    backWall.position.set(0, height / 2, -half);
    backWall.receiveShadow = true;
    this.scene.add(backWall);

    let frontWall = new THREE.Mesh(new THREE.PlaneGeometry(size, height), wallMaterial);
    frontWall.position.set(0, height / 2, half);
    frontWall.receiveShadow = true;
    this.scene.add(frontWall);

    let leftWall = new THREE.Mesh(new THREE.PlaneGeometry(size, height), wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-half, height / 2, 0);
    leftWall.receiveShadow = true;
    this.scene.add(leftWall);

    let rightWall = new THREE.Mesh(new THREE.PlaneGeometry(size, height), wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(half, height / 2, 0);
    rightWall.receiveShadow = true;
    this.scene.add(rightWall);
  }

  private createCounter(): void {
    let counterMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
    let base = new THREE.Mesh(new THREE.BoxGeometry(14, 2.5, 4), counterMaterial);
    base.position.set(0, 1.25, 25);
    base.castShadow = true;
    base.receiveShadow = true;
    this.scene.add(base);

    let top = new THREE.Mesh(new THREE.BoxGeometry(15, 0.3, 5), new THREE.MeshLambertMaterial({ color: 0x8b5c2a }));
    top.position.set(0, 2.65, 25);
    top.castShadow = true;
    top.receiveShadow = true;
    this.scene.add(top);
  }

  private addDecorations(): void {
    let plantMaterial = this.createPixelMaterial(0x228b22);
    let potMaterial = this.createPixelMaterial(0x8b4513);

    for (let i = 0; i < 50; i++) {
      let plant = new THREE.Group();

      let pot = new THREE.Mesh(this.createPixelGeometry(1, 1, 1), potMaterial);
      pot.position.y = 0.5;
      plant.add(pot);

      let leaves = new THREE.Mesh(this.createPixelGeometry(2, 3, 2), plantMaterial);
      leaves.position.y = 2.5;
      plant.add(leaves);

      plant.position.set(
        (Math.random() - 0.5) * 40,
        0,
        (Math.random() - 0.5) * 40
      );

      this.scene.add(plant);
    }
  }

  private createPixelGeometry(width: number, height: number, depth: number): THREE.BoxGeometry {
    return new THREE.BoxGeometry(width, height, depth);
  }

  private createPixelMaterial(color: number): THREE.MeshLambertMaterial {
    return new THREE.MeshLambertMaterial({
      color: color,
      flatShading: true
    });
  }

  private adjustColor(baseColor: number, adjustment: number): number {
    let r = ((baseColor >> 16) & 255) / 255;
    let g = ((baseColor >> 8) & 255) / 255;
    let b = (baseColor & 255) / 255;

    let newR = Math.max(0, Math.min(1, r + adjustment));
    let newG = Math.max(0, Math.min(1, g + adjustment));
    let newB = Math.max(0, Math.min(1, b + adjustment));

    return (Math.floor(newR * 255) << 16) | (Math.floor(newG * 255) << 8) | Math.floor(newB * 255);
  }

  private setupLighting(): void {
    let ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -25;
    directionalLight.shadow.camera.right = 25;
    directionalLight.shadow.camera.top = 25;
    directionalLight.shadow.camera.bottom = -25;
    this.scene.add(directionalLight);

    let pointLight = new THREE.PointLight(0xffa500, 0.5, 30);
    pointLight.position.set(0, 15, 0);
    pointLight.castShadow = true;
    this.scene.add(pointLight);
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.onWindowResize);
  }

  private readonly onWindowResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  navigateToSection(section: string): void {
    this.currentSection.set(section);

    const routes: { [key: string]: string } = {
      'inicio': '/',
      'register': '/register'
    };

    if (routes[section]) {
      this.router.navigate([routes[section]]);
      return;
    }

    const positions = {
      'entrance': { x: 0, y: 8, z: 25, targetX: 0, targetY: 5, targetZ: 0 },
      'center': { x: 0, y: 12, z: 0, targetX: 0, targetY: 5, targetZ: 0 },
      'left': { x: -20, y: 8, z: 0, targetX: -10, targetY: 5, targetZ: 0 },
      'right': { x: 20, y: 8, z: 0, targetX: 10, targetY: 5, targetZ: 0 },
    };

    if (positions[section as keyof typeof positions]) {
      this.animateCameraTo(positions[section as keyof typeof positions]);
    }
  }


  private animateCameraTo(targetPos: { x: number; y: number; z: number; targetX: number; targetY: number; targetZ: number }): void {
    const duration = 1000;
    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress = 1 - Math.pow(1 - progress, 3);

      this.camera.position.lerpVectors(startPos, new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z), easeProgress);

      this.controls.target.lerpVectors(startTarget, new THREE.Vector3(targetPos.targetX, targetPos.targetY, targetPos.targetZ), easeProgress);

      this.controls.update();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  resultado!: string;
  formularioRegistro: FormGroup;
  datos!: string;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private fbl: FormBuilder, private login: DatosService, private registro: DatosService, private router: Router) {
    this.formularioRegistro = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      passw: ['', [Validacionespropias.comprobar]],
      email: ['', [Validators.required, Validators.email]],
    });
    
    this.loginForm = this.fbl.group({
      usuario: ['', [Validators.required]],
      passw: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.formularioRegistro.valid) {
      let { usuario, passw, email } = this.formularioRegistro.value;
      this.registro.registro(usuario, passw, email).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Registro exitoso', response.message);
            this.resultado = "Registro completado con éxito";
            this.formularioRegistro.reset();
          } else {
            this.resultado = "Error en el registro: " + response.message;
          }
        },
        (error) => {
          console.error('Error en la solicitud', error);
          this.resultado = "Error en la comunicación con el servidor";
        }
      );
    } else {
      this.resultado = "Por favor, complete todos los campos correctamente";
    }
  }

  reset() {
    this.formularioRegistro.reset();
    this.resultado = ""
  }

  // Señales para controlar visibilidad de modales
  showLogin = signal(false);
  showRegister = signal(false);

  // Método para abrir el modal de login
  openLogin(): void {
    this.showLogin.set(true);
    this.showRegister.set(false); // Cierra registro si está abierto
  }

  // Método para cerrar el modal de login
  closeLogin(): void {
    this.showLogin.set(false);
  }

  // Método para abrir el modal de registro
  openRegister(): void {
    this.showRegister.set(true);
    this.showLogin.set(false); // Cierra login si está abierto
  }

  // Método para cerrar el modal de registro
  closeRegister(): void {
    this.showRegister.set(false);
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const { usuario, passw } = this.loginForm.value;
      this.login.login(usuario, passw).subscribe(
        (response: any) => {
          if (response.mensaje === 'ok') {
            console.log('Login exitoso', response.datos);
            localStorage.setItem('usuario', usuario)
            this.router.navigate(['']);
          } else {
            console.log('Login fallido');
          }
        },
        (error) => {
          console.error('Error en la solicitud', error);
        }
      );
    }
  }
}