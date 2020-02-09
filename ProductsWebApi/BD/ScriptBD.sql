USE hackatonsiigo
GO

DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Tenants;
GO

CREATE TABLE Tenants(
	Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL, 
	Name VARCHAR(255) NOT NULL,
);
GO

CREATE TABLE Products(
	Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL, 
	Tenant_id INT NOT NULL,
	Name VARCHAR(255) NOT NULL,
	Description VARCHAR(255),
	List_price Decimal(10,2) NOT NULL,
	FOREIGN KEY (Tenant_id) 
        REFERENCES Tenants (Id)
);

CREATE TABLE Customers(
	Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL, 
	Tenant_id INT NOT NULL,
	First_name VARCHAR(255) NOT NULL,
	Last_name VARCHAR(255) NOT NULL,
	FOREIGN KEY (Tenant_id) 
        REFERENCES Tenants (Id)
);

INSERT INTO Tenants (Name)
VALUES ('Tenant1'),('Tenant2'),('Tenant3');

INSERT INTO Products (Tenant_id, Name, Description, List_price)
VALUES 
(1,'Tenis','Tenis para todo deporte',235000.25),
(2,'Tenis','Tenis para running',215000.50),
(3,'Tenis','Tenis para escalada',225000.15),
(1,'Camisetas','Camisetas para running',75000.25),
(2,'Camisetas','Camisetas para futbol',115000.50),
(3,'Camisetas','Camisetas para yoga',55000.15),
(1,'Smartphones','XHSD1 gama media',775000.25),
(2,'Smartphones','RSD12 gama media',815000.50),
(3,'Smartphones','AZX25 gama media',657000.15),
(1,'Portatiles','Intel Core i5 8Gb-RAM 256-SSD',1775000.25),
(2,'Portatiles','Intel Core i7 16Gb-RAM 256-SSD',1815000.50),
(3,'Portatiles','Intel Core i5 4Gb-RAM 128-SSD',1657000.15),
(1,'Maletines','Grande',125000.25),
(2,'Maletines','Mediano',100000.50),
(3,'Maletines','Pequeño',87000.15);

INSERT INTO Customers (Tenant_id, First_name, Last_name)
VALUES
(1,'Juan','Perez'),
(1,'Maria','Gonzalez'),
(1,'Pedro','Parra'),
(2,'Andres','Gomez'),
(2,'Diana','Hurtado'),
(3,'Julian','Zapata'),
(3,'Diego','Jaramillo'),
(3,'Marcela','Velez'),
(3,'Ana','Estrada');
