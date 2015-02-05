CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(12) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nif` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=100;

insert into `usuarios` values(`1`,`ana`,`ana@mail.com`,`6617233D`);
insert into `usuarios` values(`2`,`oscar`,`oscar@yahoo.es`,`29120814P`);
insert into `usuarios` values(`3`,`juanda`,`juandacorreo@gmail.com`,`25456737S`);
