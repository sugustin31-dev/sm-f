# SPEC: feat-css — Modo Oscuro

## Objetivo
Aplicar modo oscuro al diseño actual de la app
de comentarios usando CSS variables, sin modificar
el HTML ni la lógica PHP existente.

## Stack
- CSS3 : variables nativas (--var), sin librerías
- JS   : vanilla, solo para toggle y persistencia
- HTML : solo agregar atributo `data-theme` al `<html>`

## Scope de este worktree
- [x] Definir paleta de colores en variables CSS
- [x] Implementar tema oscuro completo
- [x] Toggle dark/light con botón en la UI
- [x] Persistir preferencia en localStorage
- [x] Respetar `prefers-color-scheme` del sistema

## FUERA del scope
- [ ] Modificar lógica PHP o endpoints
- [ ] Cambiar estructura HTML existente
- [ ] Animaciones complejas
- [ ] Temas adicionales (más de 2)

## Paleta de colores

### Tema claro (actual → mantener)
```css
:root[data-theme="light"] {
  --bg-primary:    #ffffff;
  --bg-secondary:  #f5f5f5;
  --text-primary:  #1a1a1a;
  --text-secondary:#555555;
  --accent:        #4f46e5;
  --border:        #e0e0e0;
  --card-bg:       #ffffff;
  --input-bg:      #ffffff;
}
```

### Tema oscuro (nuevo)
```css
:root[data-theme="dark"] {
  --bg-primary:    #0f0f0f;
  --bg-secondary:  #1a1a1a;
  --text-primary:  #f0f0f0;
  --text-secondary:#a0a0a0;
  --accent:        #818cf8;
  --border:        #2a2a2a;
  --card-bg:       #1e1e1e;
  --input-bg:      #252525;
}
```

## Archivos a modificar
| Archivo      | Cambio                                      |
|--------------|---------------------------------------------|
| style.css    | Agregar variables y reglas de tema oscuro   |
| index.html   | Agregar `data-theme="light"` al `<html>`    |
| index.html   | Agregar botón toggle (ícono 🌙/☀️)          |
| theme.js     | Crear — lógica de toggle y localStorage     |

## Lógica del toggle (theme.js)
```js
const root = document.documentElement;
const btn  = document.getElementById('theme-toggle');

// 1. Respetar preferencia del sistema si no hay guardada
const saved  = localStorage.getItem('theme');
const system = window.matchMedia('(prefers-color-scheme: dark)').matches
               ? 'dark' : 'light';
root.setAttribute('data-theme', saved ?? system);

// 2. Toggle al hacer click
btn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
```

## Botón toggle (HTML)
```html
<button id="theme-toggle" aria-label="Cambiar tema">🌙</button>
```
- Posición: esquina superior derecha
- Sin texto, solo ícono
- Cambia a ☀️ cuando el tema es oscuro

## Criterios de aceptación
- [ ] El tema oscuro cubre todos los elementos visibles
- [ ] El toggle cambia entre claro y oscuro sin recargar
- [ ] La preferencia persiste al recargar la página
- [ ] En sistema con dark mode activo, carga oscuro por defecto
- [ ] No hay texto ilegible en ninguno de los dos temas
- [ ] No se modificó ningún archivo PHP
