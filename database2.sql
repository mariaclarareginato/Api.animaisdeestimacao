CREATE DATABASE IF NOT EXISTS animais_deestimacao; 

USE animais_deestimacao;

DROP TABLE IF EXISTS `animais`;

CREATE TABLE `animais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  `raca` varchar(50) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cuidadosecaracteristicas` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `animais` (`id`, `tipo`, `raca`, `nome`, `cuidadosecaracteristicas`) VALUES
(1,'Coelho','Mini-Lop','Samuca','Samuca tem alguns cortes e machucados na pele, mas não tem nada grave. Ele é muito dócil.'),
(3,'Cachorro','Coker Spaniel','Dory','Está se recuperando da micose.'),
(6,'Peixe','Palhaço','Charles','Charles tem um pouco de insuficiência renal. Ele é muito esperto.'),
(8,'Coelho','Holland Lop','Newt','Newt é muito sapeca e vive derrubando coisas que estão nas mesas. Ele é muito elétrico.'),
(10,'Gato','Persa','Marie','Marie está completamente saudável e é alérgica a queijo. Ela não gosta de carinho, mas é muito engraçada.'),
(19,'Gato','Ragdoll','Juca','Juca ama leite, gosta também de carinho, e é muito engraçado.'),
(27,'Cachorro','Golden','Charlotte','Charlotte ama passear com sua coleira favorita rosa. Ela é muito calma e mansa.'),
(36,'Cachorro','Salsicha','Merida','Merida é quietinha, e é muito apegada e grudada nos donos.'),
(55,'Gato','Birmanês','Jimin','Jimin é muito esperto e educado, mas também muito elétrico.'),
(60,'Peixe','Dourado','Molly','Molly tem uma deficiência nas suas escamas. Ela é bem arteira.');
