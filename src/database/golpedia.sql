CREATE DATABASE golfPedia;

USE golfPedia;

CREATE TABLE curtida (
  qtdCurtida INT DEFAULT NULL,
  dtCurtida TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  fkPublicacao INT NOT NULL,
  fkUsuario INT NOT NULL,
  PRIMARY KEY (fkPublicacao, fkUsuario),
  CONSTRAINT fkCurtidaPublicacao FOREIGN KEY (fkPublicacao) REFERENCES publicacao (idPublicacao),
  CONSTRAINT fkCurtidaUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

ALTER TABLE curtida DROP column qtdCurtida;

CREATE TABLE publicacao (
  idPublicacao INT AUTO_INCREMENT,
  imgPublicada VARCHAR(200),
  descricao VARCHAR(45),
  dtPublicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  titulo VARCHAR(45),
  fkUsuario INT NOT NULL,
  PRIMARY KEY (idPublicacao, fkUsuario),
  CONSTRAINT fkPublicacaoUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);
 
alter table publicacao modify column dtPublicacao datetime DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE score (
  idScore INT PRIMARY KEY AUTO_INCREMENT,
  pontos INT DEFAULT NULL,
  fkUsuario INT DEFAULT NULL,
  CONSTRAINT fkScoreUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

alter table score add column dtScore datetime default current_timestamp;

CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45),
  email VARCHAR(45),
  senha VARCHAR(45),
  dtIncricao TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  favorito VARCHAR(45)
);

CREATE TABLE comentario (
  idComentario INT NOT NULL AUTO_INCREMENT,
  fkPublicacao INT NOT NULL,
  fkUsuario INT NOT NULL,
  comentario VARCHAR(45) DEFAULT NULL,
  dtComentario TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (idComentario, fkPublicacao, fkUsuario),
  KEY fkPublicacao (fkPublicacao),
  KEY fkUsuario (fkUsuario),
  CONSTRAINT comentario_ibfk_1 FOREIGN KEY (fkPublicacao) REFERENCES publicacao (idPublicacao),
  CONSTRAINT comentario_ibfk_2 FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

ALTER TABLE usuario ADD COLUMN nickName VARCHAR(45);

 alter table publicacao add foreign key (fkUsuario) references usuario (idUsuario);

-- traz as fotos em ordem aleatoria
 SELECT idPublicacao,imgPublicada AS nome, dtPublicacao AS 'data' FROM publicacao order by rand();
 
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

SELECT idPublicacao, imgPublicada AS nome, dtPublicacao AS 'data' FROM publicacao ORDER BY rand();

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
    
select * from publicacao;


SELECT u.nome as nomeUsuario, u.nickName, u.email, u.dtIncricao, u.favorito, p.fkUsuario 
FROM usuario as u
join publicacao as p
on p.fkUsuario = u.idUsuario
where idPublicacao = 169
;

select * from publicacao where idPublicacao = 168;

SELECT u.nome as nomeUsuario, u.nickName, u.email, u.dtIncricao FROM usuario;
