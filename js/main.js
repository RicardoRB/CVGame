/**
 * Created by richy on 10/02/16.
 */
window.onload = function () {

    var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', {preload: preload, create: create, update: update});
    var cursors;
    var map;
    var player;
    var platformsLayer;

    function preload() {

        game.load.tilemap('mapTiled', 'assets/tileMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('platforms', 'assets/platformTile.png');
        game.load.spritesheet('player', 'assets/player.png', 16, 23, 4);
    }

    function create() {

        // Tiled
        game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap('mapTiled');
        map.addTilesetImage('platformTile', 'platforms');
        map.setCollisionBetween(0, 3);
        map.setCollisionBetween(5, 12);
        map.setCollisionBetween(12, 17);

        platformsLayer = map.createLayer('platforms');
        platformsLayer.resizeWorld();

        player = game.add.sprite(256, 256, 'player');

        game.physics.enable(player);
        game.physics.arcade.gravity.y = 250;

        //player.body.collideWorldBounds = true;
        game.camera.follow(player);

        cursors = game.input.keyboard.createCursorKeys();

        player.animations.add('walk');

        player.animations.play('walk', 10, true);

    }


    function update() {

        game.physics.arcade.collide(player, platformsLayer);

        player.body.velocity.x = 0;

        if (cursors.up.isDown) {
            if (player.body.onFloor()) {
                player.body.velocity.y = -200;
            }
        }

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
        }
    }

};