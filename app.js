document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('comment-form');
  const feed = document.getElementById('comments-feed');
  const submitBtn = document.getElementById('submit-btn');
  loadComments();

  form.addEventListener('submit', addComment);

  function loadComments() {
    feed.innerHTML = '<p class="loading">Cargando comentarios...</p>';

    fetch('api/comments.php')
      .then(function (res) {
        if (!res.ok) throw new Error('Error al cargar comentarios');
        return res.json();
      })
      .then(function (json) {
        renderComments(json.data);
      })
      .catch(function () {
        feed.innerHTML = '<p class="error">Error al cargar comentarios. Intenta de nuevo.</p>';
      });
  }

  function addComment(e) {
    e.preventDefault();

    var name = document.getElementById('name').value.trim();
    var message = document.getElementById('message').value.trim();

    if (!name || !message) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    var body = new FormData();
    body.append('name', name);
    body.append('message', message);

    fetch('api/comment.php', {
      method: 'POST',
      body: body,
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        if (json.success) {
          form.reset();
          loadComments();
        } else {
          alert(json.error || 'Error al enviar comentario');
        }
      })
      .catch(function () {
        alert('Error de conexión. Intenta de nuevo.');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
      });
  }

  function renderComments(comments) {
    if (!comments || comments.length === 0) {
      feed.innerHTML = '<p class="empty">No hay comentarios aún. ¡Sé el primero!</p>';
      return;
    }

    var html = '';
    comments.forEach(function (c) {
      html +=
        '<article class="comment-card">' +
          '<div class="comment-header">' +
            '<span class="comment-name">' + escapeHtml(c.name) + '</span>' +
            '<span class="comment-date">' + formatDate(c.created_at) + '</span>' +
          '</div>' +
          '<p class="comment-message">' + escapeHtml(c.message) + '</p>' +
        '</article>';
    });
    feed.innerHTML = html;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr.replace(' ', 'T'));
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

});
