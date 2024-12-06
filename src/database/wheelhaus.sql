CREATE DATABASE wheelhaus;
USE wheelhaus;

CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45),
  email VARCHAR(45),
  senha VARCHAR(45),
  dtIncricao TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  favorito VARCHAR(45)
);

ALTER TABLE usuario ADD COLUMN nickName VARCHAR(45);

ALTER TABLE usuario  MODIFY COLUMN nickName VARCHAR(45) UNIQUE;
ALTER TABLE usuario  MODIFY COLUMN email VARCHAR(45) UNIQUE;

CREATE TABLE publicacao (
  idPublicacao INT AUTO_INCREMENT,
  imgPublicada VARCHAR(200),
  dtPublicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fkUsuario INT NOT NULL,
  PRIMARY KEY (idPublicacao, fkUsuario),
  CONSTRAINT fkPublicacaoUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);
 
alter table publicacao modify column dtPublicacao datetime DEFAULT CURRENT_TIMESTAMP;


CREATE TABLE curtida (
  dtCurtida TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  fkPublicacao INT NOT NULL,
  fkUsuario INT NOT NULL,
  PRIMARY KEY (fkPublicacao, fkUsuario),
  CONSTRAINT fkCurtidaPublicacao FOREIGN KEY (fkPublicacao) REFERENCES publicacao (idPublicacao),
  CONSTRAINT fkCurtidaUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

CREATE TABLE score (
  idScore INT PRIMARY KEY AUTO_INCREMENT,
  pontos INT DEFAULT NULL,
  fkUsuario INT DEFAULT NULL,
  CONSTRAINT fkScoreUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

alter table score add column dtScore datetime default current_timestamp;


-- traz as fotos em ordem aleatoria
 SELECT idPublicacao,imgPublicada AS nome, dtPublicacao AS 'data' FROM publicacao order by rand();
 
 -- quantidade de publicações
 select count(*) from publicacao;
  
 -- apagar publicacao
 delete from publicacao where idPublicacao = 2;
 
 -- trazer por id
 SELECT * FROM publicacao WHERE fkUsuario = 1;
 
 
 -- publicacoes no intervalo de um mes
 SELECT DATE_FORMAT(dtPublicacao, '%Y-%m-%d') AS Dias ,count(*) AS 'Quantidade' 
 FROM publicacao
 WHERE dtPublicacao >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
 GROUP BY dias
 ;
 
-- score por periodo
 SELECT DATE_FORMAT(dtScore, '%d-%m') AS dia,COUNT(*) AS frequencia
FROM score
WHERE dtScore >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
GROUP BY dia;

-- top usuarios publicacao
SELECT fkUsuario, COUNT(*) AS total_publicacoes
FROM publicacao
GROUP BY fkUsuario
ORDER BY total_publicacoes DESC;

-- Rank de pontuacao
select max(s.pontos) as pontuacao, u.nickName as 'nome'
from score as s
join usuario as u
on s.fkUsuario = u.idUsuario
group by u.idUsuario
order by pontuacao desc;

-- historico de pontos usuario
SELECT DATE_FORMAT(dtScore, '%d-%m') AS dias, pontos
FROM score
WHERE dtScore >= DATE_SUB(NOW(), INTERVAL 1 MONTH) and fkUsuario = 1
ORDER BY 'Quantidade' desc;

-- Quantidade de cada pontuacao
SELECT 
    SUM(CASE WHEN pontos = 10 THEN 1 ELSE 0 END) AS 'maiorQDez',
    SUM(CASE WHEN pontos < 5 THEN 1 ELSE 0 END) AS 'menorQCinco',
    SUM(CASE WHEN pontos > 5 AND pontos < 10 THEN 1 ELSE 0 END) AS 'entreCincoDez'
FROM score;


SELECT p.idPublicacao, p.imgPublicada AS nome, p.dtPublicacao AS 'data', p.fkUsuario, c.fkUsuario, u.idUsuario 
FROM publicacao as p
JOIN usuario as u
ON u.idUsuario = p.fkUsuario
JOIN curtida as c
ON p.idPublicacao = c.fkPublicacao
;

-- curtiu a publicacao
SELECT COUNT(*) AS curtiu
FROM curtida
WHERE fkUsuario = 2 AND fkpublicacao = 159;

-- qtd a publicacao
SELECT COUNT(*) AS curtiu
FROM curtida
WHERE fkpublicacao = 159;

-- fotos curtidas
SELECT p.idPublicacao, p.imgPublicada, p.descricao,
       IF(c.fkUsuario IS NOT NULL, 1, 0) AS ja_curtiu
FROM publicacao as p
LEFT JOIN curtida c 
ON p.idPublicacao = c.fkPublicacao AND c.fkUsuario = 2  -- ? é o id do usuário logado
ORDER BY p.idPublicacao DESC;

 SELECT p.idPublicacao, p.imgPublicada AS nome, p.dtPublicacao AS 'data', p.fkUsuario, c.qtdCurtida, c.fkUsuario
 FROM publicacao as p
 left JOIN curtida as c
 ON p.idPublicacao = c.fkPublicacao
 ORDER BY rand()
 ;

SELECT p.idPublicacao, p.imgPublicada AS nome, p.dtPublicacao AS 'data', p.fkUsuario as 'userPost', c.qtdCurtida as qtdLike,
	IF(c.fkUsuario IS NOT NULL, 1, 0) AS ja_curtiu
FROM publicacao as p
left JOIN curtida as c
ON p.idPublicacao = c.fkPublicacao AND c.fkUsuario = 2
ORDER BY rand()
;
-- contar quantas curtidas
select count(*) from curtida where fkPublicacao = 158;

SELECT p.idPublicacao, p.imgPublicada AS nome, p.dtPublicacao AS 'data', p.fkUsuario as 'userPost', u.nome as nomeUsuario, u.nickName,u.email,
  IF(c.fkUsuario IS NOT NULL, 1, 0) AS ja_curtiu
FROM publicacao as p
left JOIN curtida as c
ON p.idPublicacao = c.fkPublicacao AND c.fkUsuario = 2
join usuario as u
on p.fkUsuario = u.idUsuario
ORDER BY rand();
    
SELECT u.nome as nomeUsuario, u.nickName, u.email, u.dtIncricao, u.favorito, p.fkUsuario 
FROM usuario as u
join publicacao as p
on p.fkUsuario = u.idUsuario
where idPublicacao = 169
;

SELECT count(*) from score;
SELECT count(*) as qtdQuiz from curtida;

SELECT DATE_FORMAT(dtCurtida, '%d-%m') AS dia ,count(*) AS quantidade
FROM curtida
WHERE dtCurtida >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
GROUP BY dia;

SELECT u.nome, count(*) as qtdPublicacao 
FROM publicacao as p
JOIN usuario as u
ON u.idUsuario = p.fkUsuario
group by fkUsuario;

INSERT INTO usuario (nome, email, senha, dtIncricao, favorito, nickName) VALUES
('Guilherme', 'guilherme-lira@outlook.com.br', MD5('12345678'), '2024-11-10 10:53:38', 'Golf mk4', 'GuiLira'),
('Victor', 'victor.serafim@hotmail.com', MD5('12345678'), '2024-11-10 10:53:38', 'Golf mk4', 'victorSerafim'),
('Joaquim', 'joaquim@hotmail.com', MD5('12345678'), '2024-11-10 11:33:17', 'Golf mk7', 'JoaquimFenix'),
('Victor', 'victor@gmail.com', MD5('Pryde@2030'), '2024-11-14 18:34:58', 'Golf mk2', 'Trevisan'),
('Cainã', 'cainaG@gmail.com', MD5('123456'), '2024-11-14 18:35:12', 'Golf mk4', 'Cainã'),
('Francisco de Assis', 'franciscodelira@ymail.com', MD5('123456'), '2024-11-15 16:08:21', 'Golf mk7', 'Lira'),
('Esther', 'estherthe@gmail.com', MD5('Brae@2405'), '2024-11-15 18:50:57', 'Golf mk8', 'Theodoro'),
('Cynthia', 'cynthia@gmail.com', MD5('22Pim1990@'), '2024-11-18 11:44:19', 'Golf mk1', NULL),
('Liliana Serafim dos Santos', 'lilianasersantos@hotmail.com', MD5('Olivia29'), '2024-11-22 20:08:53', 'Golf mk8', 'Lili'),
('Kawan Fritoli Gomes', 'kawan@gmail.com', MD5('123456'), '2024-11-29 11:08:12', 'Golf mk4', 'Ruivo57');

INSERT INTO score (pontos, fkUsuario, dtScore) VALUES
(10, 1, '2024-11-17 12:18:26'),
(5, 2, '2024-11-17 12:18:26'),
(8, 3, '2024-11-17 12:18:26'),
(4, 5, '2024-11-17 12:18:26'),
(7, 4, '2024-11-17 12:18:26'),
(5, 6, '2024-11-17 12:18:26'),
(9, 7, '2024-11-17 12:18:26'),
(10, 1, '2024-11-19 21:33:37'),
(2, 1, '2024-11-19 21:49:05'),
(2, 1, '2024-11-20 16:26:49'),
(7, 10, '2024-11-22 20:17:08'),
(10, 1, '2024-11-24 17:56:29'),
(2, 1, '2024-11-24 17:56:57'),
(6, 1, '2024-11-29 14:11:16');

select * from score order by pontos;

select * from usuario  where nickName = 'GuiLira';

update publicacao set dtpublicacao = '2024-12-04 14:39:40'
where idPublicacao = 4;
