DROP DATABASE IF EXISTS Kai;

CREATE DATABASE Kai CHARACTER SET utf8mb4;
USE Kai;

CREATE TABLE libros (
    codigo INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255),
    autor VARCHAR(255),
    fecha_publicacion INT,
    editorial VARCHAR(255),
    paginas INT,
    PRIMARY KEY (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;


INSERT INTO libros (codigo, titulo, autor, fecha_publicacion, editorial, paginas) VALUES 
(1, 'El Señor de los Anillos', 'J.R.R. Tolkien', 1954, 'Minotauro', 1200),
(2, 'Cien años de soledad', 'Gabriel García Márquez', 1967, 'Sudamericana', 417),
(3, '1984', 'George Orwell', 1949, 'Secker and Warburg', 328),
(4, 'Don Quijote de la Mancha', 'Miguel de Cervantes', 1605, 'Francisco de Robles', 863),
(5, 'Matar a un ruiseñor', 'Harper Lee', 1960, 'J.B. Lippincott & Co.', 281),
(6, 'El principito', 'Antoine de Saint-Exupéry', 1943, 'Reynal & Hitchcock', 96),
(7, 'Harry Potter y la piedra filosofal', 'J.K. Rowling', 1997, 'Bloomsbury', 223),
(8, 'El código Da Vinci', 'Dan Brown', 2003, 'Doubleday', 454),
(9, 'El alquimista', 'Paulo Coelho', 1988, 'HarperCollins', 208),
(10, 'El nombre de la rosa', 'Umberto Eco', 1980, 'Bompiani', 503),
(11, 'La sombra del viento', 'Carlos Ruiz Zafón', 2001, 'Planeta', 521),
(12, 'El perfume', 'Patrick Süskind', 1985, 'Diogenes Verlag', 263),
(13, 'La historia interminable', 'Michael Ende', 1979, 'K. Thienemanns Verlag', 448),
(14, 'El retrato de Dorian Gray', 'Oscar Wilde', 1890, 'Lippincott''s Monthly Magazine', 189),
(15, 'El guardián entre el centeno', 'J.D. Salinger', 1951, 'Little, Brown and Company', 234),
(16, 'La naranja mecánica', 'Anthony Burgess', 1962, 'William Heinemann', 213),
(17, 'El gran Gatsby', 'F. Scott Fitzgerald', 1925, 'Charles Scribner''s Sons', 180),
(18, 'Crónica de una muerte anunciada', 'Gabriel García Márquez', 1981, 'La Oveja Negra', 120),
(19, 'El amor en los tiempos del cólera', 'Gabriel García Márquez', 1985, 'Oveja Negra', 368),
(20, 'La casa de los espíritus', 'Isabel Allende', 1982, 'Plaza & Janés', 433),
(21, 'Rayuela', 'Julio Cortázar', 1963, 'Sudamericana', 733),
(22, 'Pedro Páramo', 'Juan Rulfo', 1955, 'Fondo de Cultura Económica', 124),
(23, 'La ciudad y los perros', 'Mario Vargas Llosa', 1963, 'Seix Barral', 456),
(24, 'La tregua', 'Mario Benedetti', 1960, 'La Oveja Negra', 184),
(25, 'La fiesta del chivo', 'Mario Vargas Llosa', 2000, 'Alfaguara', 476),
(26, 'La casa de Bernarda Alba', 'Federico García Lorca', 1945, 'Losada', 96),
(27, 'La metamorfosis', 'Franz Kafka', 1915, 'Kurt Wolff Verlag', 56),
(28, 'El extranjero', 'Albert Camus', 1942, 'Gallimard', 123),
(29, 'El túnel', 'Ernesto Sábato', 1948, 'Sur', 120),
(30, 'La insoportable levedad del ser', 'Milan Kundera', 1984, 'Gallimard', 312),
(31, 'El lobo estepario', 'Hermann Hesse', 1927, 'S. Fischer Verlag', 218),
(32, 'El tambor de hojalata', 'Günter Grass', 1959, 'Hermann Luchterhand Verlag', 576),
(33, 'El señor de las moscas', 'William Golding', 1954, 'Faber and Faber', 224),
(34, 'El viejo y el mar', 'Ernest Hemingway', 1952, 'Charles Scribner''s Sons', 127),
(35, 'El amor en los tiempos del cólera', 'Gabriel García Márquez', 1985, 'Oveja Negra', 368),
(36, 'La casa de los espíritus', 'Isabel Allende', 1982, 'Plaza & Janés', 433),
(37, 'Rayuela', 'Julio Cortázar', 1963, 'Sudamericana', 733),
(38, 'Pedro Páramo', 'Juan Rulfo', 1955, 'Fondo de Cultura Económica', 124),
(39, 'La ciudad y los perros', 'Mario Vargas Llosa', 1963, 'Seix Barral', 456),
(40, 'La tregua', 'Mario Benedetti', 1960, 'La Oveja Negra', 184),
(41, 'La fiesta del chivo', 'Mario Vargas Llosa', 2000, 'Alfaguara', 476),
(42, 'La casa de Bernarda Alba', 'Federico García Lorca', 1945, 'Losada', 96),
(43, 'La metamorfosis', 'Franz Kafka', 1915, 'Kurt Wolff Verlag', 56),
(44, 'El extranjero', 'Albert Camus', 1942, 'Gallimard', 123),
(45, 'El túnel', 'Ernesto Sábato', 1948, 'Sur', 120),
(46, 'La insoportable levedad del ser', 'Milan Kundera', 1984, 'Gallimard', 312),
(47, 'El lobo estepario', 'Hermann Hesse', 1927, 'S. Fischer Verlag', 218),
(48, 'El tambor de hojalata', 'Günter Grass', 1959, 'Hermann Luchterhand Verlag', 576),
(49, 'El señor de las moscas', 'William Golding', 1954, 'Faber and Faber', 224),
(50, 'El viejo y el mar', 'Ernest Hemingway', 1952, 'Charles Scribner''s Sons', 127);

CREATE TABLE lista (
    codigo INT NOT NULL,
    titulo VARCHAR(255),
    autor VARCHAR(255),
    paginas INT,
    fecha_insercion DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- INSERT INTO lista (codigo, titulo, paginas)
-- SELECT codigo, titulo, paginas
-- FROM libros;

CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO usuarios VALUES (1,'Alex', 'alex@gmail.com', 'hola')
INSERT INTO lista (codigo, titulo, autor, paginas)VALUES (1, 'El Señor de los Anillos', 'J.R.R. Tolkien', 1200);
