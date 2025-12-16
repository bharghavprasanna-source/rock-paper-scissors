let scorecard = JSON.parse(localStorage.getItem('scorecard'));

      if(!scorecard)
      {
        scorecard=
        {
          win:0,
          losses:0,
          Tie:0
        };
      }

      updatescore();

      let isAutoPlaying =false;
      let intervalId;

      function autoplay()
      {
        if (!isAutoPlaying)
        {
        intervalId = setInterval(() =>
        {
          const playermove=pickcomputermove();
          playgame(playermove);
        },1500)
        isAutoPlaying=true;
        }
        else
        {
          clearInterval(intervalId);
          isAutoPlaying=false;
        }
      }

      document.querySelector('.js-rock-button').addEventListener('click',()=>{playgame('rock')});

      document.querySelector('.js-paper-button').addEventListener('click',()=>{playgame('paper')});

      document.querySelector('.js-scissors-button').addEventListener('click',()=>{playgame('Scissors')});


      document.body.addEventListener('keydown',(event)=>{
        if(event.key === 'r')
        {
          playgame('rock');
        }
        else if(event.key === 'p')
        {
          playgame('paper');
        }
        else if(event.key === 's')
        {
          playgame('Scissors')
        }
      })



      function playgame(playermove)
      {
        const com_move=pickcomputermove();
        let result='';
        if(playermove === 'Scissors')
        {
          if(com_move==='rock')
          {
            result='You Lose.';
          }
          else if(com_move === 'paper')
          {
            result='You won.';
          }

          else if(com_move === 'Scissors')
          {
            result='Tie.';
          }
        }
        else if(playermove === 'paper')
        {
          if(com_move ==='rock')
          {
            result='You won.';
          }
          else if(com_move === 'paper')
          {
            result='Tie.';
          }

          else if(com_move === 'Scissors')
          {
            result='You Lose.';
          }
        }
        else if(playermove === 'rock')
        {
          if(com_move === 'rock')
          {
            result='Tie.';
          }

          else if(com_move === 'paper')
          {
            result='You Lose.';
          }

          else if (com_move === 'Scissors')
          {
            result='You won.';
          }
        }
        
        if(result === 'You won.')
        {
          scorecard.win++;
        }
        else if(result === 'Tie.')
        {
          scorecard.Tie++;
        }
        else
        {
          scorecard.losses++;
        }

        localStorage.setItem('scorecard' , JSON.stringify(scorecard));

        updatescore();

        document.querySelector('.js-result').innerHTML= `${result}`;

        document.querySelector('.js-moves').innerHTML= 
        `Your Move
        <img src="rock-paper-scissors/${playermove}-emoji.png" 
        class="move-icon">
        <img src="rock-paper-scissors/${com_move}-emoji.png" class="move-icon"> Computer Move`;
        
      }

      function updatescore()
      {
        document.querySelector('.js-score').innerHTML =
        `Wins: ${scorecard.win} , losses: ${scorecard.losses},Ties: ${scorecard.Tie}`;
      }

      function pickcomputermove()
      {
      let com_move='';
      const random_number = Math.random();
      
      if(random_number>=0 && random_number < (1/3) )
      {
        com_move='rock';
      }
      
      else if(random_number >= (1/3) && random_number < (2/3))
      {
        com_move='paper';
      }

      else
      {
        com_move='Scissors';
      }

      return com_move;
      }