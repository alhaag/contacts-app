--
-- Banco de dados: `contacts`
--
DROP DATABASE IF EXISTS `contacts`;
CREATE DATABASE IF NOT EXISTS `contacts` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `contacts`;

-- --------------------------------------------------------
--
-- Estrutura para tabela `person_group`
--
CREATE TABLE `person_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
--
-- Fazendo dump de dados para tabela `group`
--
INSERT INTO `person_group` (`id`, `name`) VALUES
(1, 'Outros'),
(2, 'Familia'),
(3, 'Trabalho'),
(4, 'Escola');

-- --------------------------------------------------------
--
-- Estrutura para tabela `person`
--
CREATE TABLE `person` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_person_group` int(11) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `name` varchar(255) NOT NULL,
  `alias` varchar(100) NULL,
  `address` varchar(255) NULL,
  `site` varchar(255) NULL,
  `comments` TEXT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
--
-- Fazendo dump de dados para tabela `person`
--
INSERT INTO `person` (`id`, `id_person_group`, `created_at`, `updated_at`, `name`, `alias`, `address`, `site`, `comments`) VALUES
(1, 1, '2018-08-04 00:00:00', '2018-08-04 00:00:00', 'André Luiz Haag', 'Haag', 'Rua das Araras, 1024', 'andreluizhaag.com.br', 'Primeiro contato da lista :-)'),
(2, 1, '2018-08-04 00:00:00', '2018-08-04 00:00:00', 'Maria da Silva', 'Má', null, null, null);

-- --------------------------------------------------------
--
-- Estrutura para tabela `phone_type`
--
CREATE TABLE `phone_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
--
-- Fazendo dump de dados para tabela `phone`
--
INSERT INTO `phone_type` (`id`, `name`) VALUES
(1, 'Principal'),
(2, 'Casa'),
(3, 'Celular'),
(4, 'Trabalho'),
(5, 'Outros');

-- --------------------------------------------------------
--
-- Estrutura para tabela `phone`
--
CREATE TABLE `phone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_person` int(11) NOT NULL,
  `id_phone_type` int(11) NOT NULL,
  `number` varchar(14) NOT NULL,
  `is_whatsapp` SMALLINT(1) NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
--
-- Fazendo dump de dados para tabela `phone`
--
INSERT INTO `phone` (`id`, `id_person`, `id_phone_type`, `number`, `is_whatsapp`) VALUES
(1, 1, 3, '4899995555', 1),
(2, 1, 3, '4832225566', 0),
(3, 2, 3, '4884842525', 1),
(4, 2, 3, '4830860000', 0);

-- --------------------------------------------------------
--
-- Estrutura para tabela `mail`
--
CREATE TABLE `mail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_person` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
--
-- Fazendo dump de dados para tabela `mail`
--
INSERT INTO `mail` (`id`, `id_person`, `address`) VALUES
(1, 1, 'andreluizhaag@gmail.com'),
(2, 2, 'test@gmail.com');

