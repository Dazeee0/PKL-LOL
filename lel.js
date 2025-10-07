        // Particle system
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            const colors = ['#0ea5e9', '#06b6d4', '#8b5cf6', '#06b6d4'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            document.querySelector('.ocean-container').appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 15000);
        }

        // Create particles periodically
        setInterval(createParticle, 1500);

        // Input focus effects
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.parentElement.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                this.parentElement.parentElement.style.transform = 'translateY(0)';
            });
        });
// Mikrotik form: allow normal submission
const mikrotikForm = document.getElementById('loginForm');
if (mikrotikForm) {
  mikrotikForm.addEventListener('submit', () => {
    const button = mikrotikForm.querySelector('.login-button');
    const buttonText = button.querySelector('.button-text');
    const spinner = button.querySelector('.loading-spinner');

    // Just visual feedback
    buttonText.textContent = 'Connecting...';
    spinner.style.display = 'block';
  });
}
            // Subtle notification animation
            const container = document.querySelector('.login-container');
            container.style.transform = 'scale(1.02)';
            container.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                container.style.transform = 'scale(1)';
                // Show elegant notification
                showNotification('Selamat datang di halaman Login');
            }, 200);
        // Elegant notification system
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 30px;
                right: 30px;
                background: rgba(16, 185, 129, 0.9);
                backdrop-filter: blur(20px);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                font-weight: 500;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                transform: translateX(400px);
                transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }

        // Mouse movement parallax for depth layers
        document.addEventListener('mousemove', function(e) {
            const layers = document.querySelectorAll('.depth-layer');
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            layers.forEach((layer, index) => {
                const speed = (index + 1) * 0.5;
                layer.style.transform = `translate(${x * speed * 0.1}px, ${y * speed * 0.1}px)`;
            });
        });

        // Initialize particles on load
        window.addEventListener('load', () => {
            for(let i = 0; i < 8; i++) {
                setTimeout(createParticle, i * 200);
            }
        });
// === QR Code Login ===
window.addEventListener('load', () => {
  const qrBtn = document.getElementById('qrLoginBtn');
  const qrModal = document.getElementById('qrModal');
  const closeQr = document.getElementById('closeQr');
  let html5QrCode;

  if (!qrBtn) return; // if no QR button (voucher page), stop

  qrBtn.addEventListener('click', e => {
    e.preventDefault();
    qrModal.style.display = 'flex';
    html5QrCode = new Html5Qrcode("qrVideo");

    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      decodedText => {
        const usernameField = document.getElementById('username');
        if (usernameField) {
          usernameField.value = decodedText;
          showNotification(`QR Code diterima: ${decodedText}`);
          html5QrCode.stop();
          qrModal.style.display = 'none';
          // auto-submit to Mikrotik login
          document.getElementById('loginForm').submit();
        }
      }
    ).catch(err => {
      showNotification('Kamera tidak dapat diakses');
      console.error(err);
    });
  });

  closeQr.addEventListener('click', () => {
    qrModal.style.display = 'none';
    if (html5QrCode) html5QrCode.stop();
  });
});
// === Voucher Redirect ===
window.addEventListener('DOMContentLoaded', () => {
    const voucherBtn = document.getElementById('voucherBtn');
    if (voucherBtn) {
        voucherBtn.addEventListener('click', e => {
            e.preventDefault();
            window.location.href = 'voucher.html';
        });
    }
});