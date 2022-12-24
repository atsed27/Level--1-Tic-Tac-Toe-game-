window.addEventListener('DOMContentLoaded',()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton =document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    let board = ['','','','','','','','',''];
    let currentplayer = 'x';
    let isGameActive = true;

    const playerx_win = 'PLAYERX_WIN';
    const playero_win = 'PLAYERO_WIN';
    const TIE = 'TIE';
    
    const winningCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function handleResultvalidation(){
        let roundwon = false;
        for(let i= 0 ;i<=7;i++){
            const wincondition = winningCondition[i];
            const a= board[wincondition[0]];
            const b = board[wincondition[1]];
            const c = board[wincondition[2]];
            if(a===''|| b===''||c===''){
                continue;
            }
            if(a===b&&b===c){
                roundwon = true;
                break;
            }
        }
        if(roundwon){
            announce(currentplayer === 'x'? playerx_win:playero_win);
            isGameActive = false;
            return;

        }
        if(!board.includes('')){
            announce(TIE);
        }
    }
    const announce = (type)=>{
        switch(type){
            case playero_win:
                announcer.innerHTML = 'player <span class = "playero">o </span>Won';
                break;

            
            case playerx_win:
                announcer.innerHTML= 'player <span class = "playerx">x </span>Won';
                break;

            case TIE:
                announcer.innerText = 'Tie';    
        }        
        announcer.classList.remove('hide');
    };
    const isvalidAction = (tile)=>{
        if(tile.innerText === 'x' || tile.innerText === 'o'){
            return false;
        }
        return true;
    }
    const updateBoard = (index)=>{
        board[index]=currentplayer;
    }
    const changeplayer =()=>{
        playerDisplay.classList.remove(`player${currentplayer}`);
        currentplayer = currentplayer ==='x'?'o':'x';
        playerDisplay.innerText = currentplayer;
        playerDisplay.classList.add(`player${currentplayer}`);
    }
     const userAction = (tile,index)=>{
        if(isvalidAction(tile)&&isGameActive){
            tile.innerText = currentplayer;
            tile.classList.add(`player${currentplayer}`);
            updateBoard(index);
            handleResultvalidation();
            changeplayer();
        }
     }
     const resetBoard =()=>{
        board = ['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');

        if(currentplayer === 'o'){
            changeplayer();

        }

        tiles.forEach(tile=>{
            tile.innerText = '';
            tile.classList.remove('playerx');
            tile.classList.remove('playero')
        });

     }

    tiles.forEach((tile,index)=>{
        tile.addEventListener('click',()=>userAction(tile,index));
    });


    resetButton.addEventListener('click',resetBoard);

});

