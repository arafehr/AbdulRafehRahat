jQuery(function ($) {
	"use strict";
    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
           $('.web-header .navbar').addClass('navbar-white');
        } else {
           $('.web-header .navbar').removeClass('navbar-white');
        }
    });
    class Particle {
        constructor(canvas, ctx) {
          this.canvas = canvas;
          this.ctx = ctx;
          this.reset();
          this.y = Math.random() * canvas.height;
          this.fadeDelay = Math.random() * 600 + 100;
          this.fadeStart = Date.now() + this.fadeDelay;
          this.fadingOut = false;
        }
      
        reset() {
          this.x = Math.random() * this.canvas.width;
          this.y = Math.random() * this.canvas.height;
          this.speed = Math.random() / 5 + 0.1;
          this.opacity = 1;
          this.fadeDelay = Math.random() * 600 + 100;
          this.fadeStart = Date.now() + this.fadeDelay;
          this.fadingOut = false;
        }
      
        update() {
          this.y -= this.speed;
          if (this.y < 0) {
            this.reset();
          }
      
          if (!this.fadingOut && Date.now() > this.fadeStart) {
            this.fadingOut = true;
          }
      
          if (this.fadingOut) {
            this.opacity -= 0.008;
            if (this.opacity <= 0) {
              this.reset();
            }
          }
        }
      
        draw() {
          this.ctx.fillStyle = `rgba(${255 - Math.random() * 255}, 255, 255, ${this.opacity})`;
          this.ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
        }
      }
      
      class ParticleSystem {
        constructor() {
          this.canvas = document.querySelector('.canvas');
          this.ctx = this.canvas.getContext('2d');
          this.particles = [];
          this.updateCanvasSize();
          this.initParticles();
          this.animate();
          window.addEventListener('resize', () => this.onResize());
        }
      
        updateCanvasSize() {
          this.canvas.width = window.innerWidth;
          this.canvas.height = window.innerHeight;
        }
      
        calculateParticleCount() {
          return Math.floor((this.canvas.width * this.canvas.height) / 4000);
        }
      
        initParticles() {
          this.particles = [];
          const particleCount = this.calculateParticleCount();
          for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.ctx));
          }
        }
      
        animate() {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.particles.forEach(particle => {
            particle.update();
            particle.draw();
          });
          requestAnimationFrame(() => this.animate());
        }
      
        onResize() {
          this.updateCanvasSize();
          this.initParticles();
        }
      }
      
    new ParticleSystem();
    var $btns = $('.filter-item').click(function() {
        if (this.id == 'all') {
          $('#filter-content > div').fadeIn(450);
        } else {
          var $el = $('.' + this.id).fadeIn(450);
          $('#filter-content > div').not($el).hide();
        }
        $btns.removeClass('active');
        $(this).addClass('active');
    })
});
  