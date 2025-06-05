import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DatosService } from '../datos.service';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

interface Genre {
  id: string;
  name: string;
  color: number;
  position: { x: number; z: number };
}

interface NavigationSection {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-library',
  imports: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit, AfterViewInit, OnDestroy {
  private datosService = inject(DatosService);
  private router = inject(Router);

  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;
  controls!: OrbitControls;

  currentSection = signal<string>('entrance');
  selectedGenre = signal<string>('');
  showGenreMenu = signal<boolean>(false);

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

  readonly genres: Genre[] = [
    { id: 'Science Fiction', name: 'Science Fiction', color: 0xff6b6b, position: { x: -10, z: -5 } },
    { id: 'Fantasy', name: 'Fantasy', color: 0x4ecdc4, position: { x: 0, z: -5 } },
    { id: 'Misterio', name: 'Mystery', color: 0x45b7d1, position: { x: 10, z: -5 } },
    { id: 'Novel', name: 'Novel', color: 0xf9ca24, position: { x: -10, z: 5 } },
    { id: 'Filosophy', name: 'Filosophy', color: 0xa55eea, position: { x: 0, z: 5 } },
    { id: 'Adventure', name: 'Adventure', color: 0xfd79a8, position: { x: 10, z: 5 } }
  ];

  ngOnInit(): void {
    console.log('🚀 Proyecto TFG de Alex Urueña: Kai Shelves');
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
    document.removeEventListener('click', this.onMouseClick);
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
    let floorGeometry = new THREE.PlaneGeometry(120, 120);
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
    this.createBookshelves();
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
    base.position.set(0, 1.25, 50);
    base.castShadow = true;
    base.receiveShadow = true;
    this.scene.add(base);

    let top = new THREE.Mesh(new THREE.BoxGeometry(15, 0.3, 5), new THREE.MeshLambertMaterial({ color: 0x8b5c2a }));
    top.position.set(0, 2.65, 50);
    top.castShadow = true;
    top.receiveShadow = true;
    this.scene.add(top);
  }

  private createBookshelves(): void {
    let loader = new THREE.TextureLoader();

    this.genres.forEach((genre, genreIndex) => {
      let bookshelfGroup = new THREE.Group();
      bookshelfGroup.name = `bookshelf-${genre.id}`;

      let shelfMaterial = this.createPixelMaterial(0x8b4513);
      let pillar1 = new THREE.Mesh(this.createPixelGeometry(1, 8, 1), shelfMaterial);
      pillar1.position.set(-2, 4, 0);
      pillar1.castShadow = true;
      bookshelfGroup.add(pillar1);

      let pillar2 = new THREE.Mesh(this.createPixelGeometry(1, 8, 1), shelfMaterial);
      pillar2.position.set(2, 4, 0);
      pillar2.castShadow = true;
      bookshelfGroup.add(pillar2);

      for (let i = 0; i < 4; i++) {
        let shelf = new THREE.Mesh(this.createPixelGeometry(5, 0.5, 3), shelfMaterial);
        shelf.position.set(0, 2 + i * 2, 0);
        shelf.castShadow = true;
        shelf.receiveShadow = true;
        bookshelfGroup.add(shelf);

        for (let j = 0; j < 8; j++) {
          let ancho = 0.25 + Math.random() * 0.18;
          let alto = 1.1 + Math.random() * 0.7;
          let fondo = 1.7 + Math.random() * 0.3;

          let portadaTexture: THREE.Texture | null = null;
          if (Math.random() > 0.7) {
            portadaTexture = loader.load('assets/texturas/portada' + ((genreIndex % 3) + 1) + '.jpg', undefined, undefined, () => { });
          }

          let materials = [
            this.createPixelMaterial(this.adjustColor(genre.color, (Math.random() - 0.5) * 0.2)),
            this.createPixelMaterial(this.adjustColor(genre.color, (Math.random() - 0.5) * 0.2)),
            portadaTexture ? new THREE.MeshLambertMaterial({ map: portadaTexture }) : this.createPixelMaterial(genre.color),
            this.createPixelMaterial(this.adjustColor(genre.color, -0.2)),
            this.createPixelMaterial(0xeeddaa),
            this.createPixelMaterial(0x8b5c2a)
          ];

          let book = new THREE.Mesh(
            new THREE.BoxGeometry(ancho, alto, fondo),
            materials
          );
          book.position.set(-2 + j * 0.5, 2.5 + alto / 2 + i * 2, 0.5 + (Math.random() - 0.5) * 0.3);
          book.rotation.z = (Math.random() - 0.5) * 0.1;
          book.castShadow = true;
          bookshelfGroup.add(book);
        }
      }

      this.createGenreSign(bookshelfGroup, genre);

      bookshelfGroup.position.set(genre.position.x, 0, genre.position.z);
      bookshelfGroup.userData = { genre: genre.id, genreName: genre.name };
      this.scene.add(bookshelfGroup);
    });
  }

  private createGenreSign(parent: THREE.Group, genre: Genre): void {
    let signGeometry = new THREE.PlaneGeometry(4, 1);
    let signMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9
    });
    let sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.set(0, 9, 0.1);
    parent.add(sign);

    let borderGeometry = new THREE.EdgesGeometry(signGeometry);
    let borderMaterial = new THREE.LineBasicMaterial({ color: genre.color });
    let border = new THREE.LineSegments(borderGeometry, borderMaterial);
    border.position.set(0, 9, 0.11);
    parent.add(border);
  }

  private addDecorations(): void {
    let plantMaterial = this.createPixelMaterial(0x228b22);
    let potMaterial = this.createPixelMaterial(0x8b4513);

    for (let i = 0; i < 4; i++) {
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
    document.addEventListener('click', this.onMouseClick);
    window.addEventListener('resize', this.onWindowResize);
  }

  private readonly onMouseClick = (event: MouseEvent): void => {
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    let intersects = raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      let object: THREE.Object3D | null = intersects[0].object;
      let foundGenre = null;
      while (object) {
        if (object.userData && object.userData['genre']) {
          foundGenre = object.userData;
          break;
        }
        object = object.parent as THREE.Object3D | null;
      }
      if (foundGenre) {
        let genreName = foundGenre['genreName'] || foundGenre['genre'];
        this.selectedGenre.set(genreName);
        this.showGenreMenu.set(true);
      }
    }
  };

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

    // Rutas a los componentes
    const routes: { [key: string]: string } = {
      'inicio': '/',
      'register': '/register'
    };

    if (routes[section]) {
      this.router.navigate([routes[section]]);
      return;
    }

    // Movimiento de cámara
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

  getGenreColor(color: number): string {
    return `#${color.toString(16).padStart(6, '0')}`;
  }

  closeGenreMenu(): void {
    this.showGenreMenu.set(false);
    this.selectedGenre.set('');
  }

  // Señales para controlar la vista
  showCatalogView = signal<boolean>(false);
  showSearchView = signal<boolean>(false);
  books = signal<any[]>([]);
  searchResults = signal<any[]>([]);

  // Método para mostrar el catálogo del género seleccionado
  showCatalog(): void {
    this.showCatalogView.set(true);
    this.fetchBooksByGenre(this.selectedGenre());
  }

  // Método para buscar libros en el género seleccionado
  searchBooks(query?: string): void {
    this.showSearchView.set(true);
    if (query) {
      this.fetchBooksByGenreAndQuery(this.selectedGenre(), query);
    } else {
      this.searchResults.set([]);
    }
  }

  // Métodos para cerrar las vistas
  closeCatalog(): void {
    this.showCatalogView.set(false);
    this.books.set([]);
  }
  closeSearch(): void {
    this.showSearchView.set(false);
    this.searchResults.set([]);
  }

  // Métodos para obtener los datos desde el backend PHP
  fetchBooksByGenre(genreName: string): void {
    this.datosService.getBooksByGenre(genreName)
      .subscribe({
        next: (books) => this.books.set(books),
        error: (err) => console.error('Error fetching books:', err)
      });
  }

  fetchBooksByGenreAndQuery(genreName: string, query: string): void {
    this.datosService.searchBooks(genreName, query)
      .subscribe({
        next: (books) => this.searchResults.set(books),
        error: (err) => console.error('Error searching books:', err)
      });
  }

  // Método para mostrar detalles de un libro (opcional)
  showBookDetails(book: any): void {
    // Implementa aquí la lógica para mostrar detalles del libro
    alert(`Book: ${book.titulo}\nAuthor: ${book.autor}\nYear: ${book.fecha_publicacion}`);
  }
}
