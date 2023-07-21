    let character;
    let cacti = [];
    let isJumping = false;
    let gravity = 0.6;
    let jumpForce = -12;

    function setup() {
      createCanvas(800, 400);
      character = createSprite(50, height - 50, 30, 50);
      character.shapeColor = color(255, 0, 0);
    }

    function draw() {
      background(255);
      drawSprites();
      
      // Movimenta o personagem para a direita automaticamente
      character.position.x += 3;

      // Aplica gravidade ao personagem se estiver no ar
      if (isJumping) {
        character.velocity.y += gravity;
      }
      
      // Impede que o personagem caia infinitamente
      if (character.position.y > height - 50) {
        character.position.y = height - 50;
        character.velocity.y = 0;
        isJumping = false;
      }

      // Cria cactos aleatoriamente no caminho
      if (frameCount % 60 === 0) {
        let cactus = createSprite(width, height - 50, 20, 50);
        cactus.shapeColor = color(0, 255, 0);
        cactus.velocity.x = -3;
        cacti.push(cactus);
      }

      // Remove os cactos que saem da tela
      for (let i = cacti.length - 1; i >= 0; i--) {
        if (cacti[i].position.x < 0) {
          cacti[i].remove();
          cacti.splice(i, 1);
        }
      }

      // Verifica colisão com os cactos
      for (let i = 0; i < cacti.length; i++) {
        if (character.collide(cacti[i])) {
          console.log("Game Over!");
          noLoop(); // Para o loop do jogo se houver colisão
        }
      }
    }

    // Ao pressionar a tecla de espaço, o personagem pula
    function keyPressed() {
      if (!isJumping) {
        character.velocity.y = jumpForce;
        isJumping = true;
      }
    }