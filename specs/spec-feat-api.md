# SPEC: feat-api — Valoración de Curso

## Objetivo
Agregar un campo `rating` (valoración del 1 al 5)
a la tabla `comments` existente, y exponerlo
en la API PHP sin romper el contrato actual.

## Stack
- Backend  : PHP 8.x, PDO + prepared statements
- DB       : MySQL (tabla: comments)
- Frontend : JS vanilla (sin frameworks)

## Scope de este worktree
- [x] Migración: ALTER TABLE para agregar columna `rating`
- [x] POST /api/comment.php — aceptar campo `rating`
- [x] GET  /api/comments.php — devolver `rating` en JSON
- [x] Validación server-side: entero entre 1 y 5
- [x] Formulario HTML: agregar input de estrellas (1–5)
- [x] Mostrar valoración en el feed existente

## FUERA del scope
- [ ] Edición/borrado de valoraciones
- [ ] Promedio de valoraciones
- [ ] Autenticación
- [ ] Paginación

## Migración DB
```sql
ALTER TABLE comments
  ADD COLUMN rating TINYINT UNSIGNED NOT NULL DEFAULT 1
  CHECK (rating BETWEEN 1 AND 5);
```

## Cambios en API

### POST /api/comment.php
Campos esperados:
| Campo   | Tipo    | Validación            |
|---------|---------|-----------------------|
| name    | string  | max 60 chars          |
| message | string  | max 500 chars         |
| rating  | integer | entre 1 y 5 inclusive |

Respuesta éxito:
```json
{ "status": "ok", "id": 42 }
```

Respuesta error de validación:
```json
{ "status": "error", "message": "Rating debe ser entre 1 y 5" }
```

### GET /api/comments.php
Respuesta (agrega campo rating):
```json
[
  {
    "id": 1,
    "name": "Juan",
    "message": "Excelente curso",
    "rating": 5,
    "created_at": "2026-05-12 10:00:00"
  }
]
```

## Validación server-side (PHP)
```php
$rating = filter_input(INPUT_POST, 'rating', FILTER_VALIDATE_INT,
    ['options' => ['min_range' => 1, 'max_range' => 5]]);
if ($rating === false || $rating === null) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Rating inválido']);
    exit;
}
```

## UI — Input de valoración
- Radio buttons o estrellas clicables (★)
- JS vanilla, sin librerías
- Valor por defecto: ninguno seleccionado (forzar elección)
- Mostrar en el feed: "★★★★☆ (4/5)"

## Criterios de aceptación
- [ ] La migración corre sin errores en MySQL
- [ ] POST sin `rating` devuelve error 422
- [ ] POST con `rating=3` guarda correctamente
- [ ] GET devuelve `rating` en todos los comentarios
- [ ] El formulario no permite enviar sin seleccionar rating
- [ ] Los comentarios existentes muestran rating por defecto (1)
