# SPEC: App de Comentarios — Workshop

## Objetivo
App web para que los asistentes del curso
dejen comentarios públicos.

## Stack
- Frontend : HTML5, CSS3, JS vanilla
- Backend  : PHP 8.x
- DB       : MySQL (tabla: comments)
- Deploy   : InfinityFree (gratis)

## Scope
- [x] Formulario: Nombre + Mensaje
- [x] POST /api/comment.php
- [x] GET  /api/comments.php (JSON)
- [x] Feed sin recargar la página
- [x] Sanitización server-side

## FUERA del scope
- [ ] Autenticación
- [ ] Edición/borrado
- [ ] Paginación

## Esquema DB
CREATE TABLE comments (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(60)  NOT NULL,
  message    VARCHAR(500) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);