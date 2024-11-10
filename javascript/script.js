let char = new Slayer('TANJIRO KAMADO');
let monster = new Hashira('RENGOKU RIMASOLTA')

const battle = new Battle(
    char,
    monster,
    document.querySelector('#hero'),
    document.querySelector('#monster')
)

battle.start();