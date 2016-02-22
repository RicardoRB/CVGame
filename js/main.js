/**
 * Created by richy on 10/02/16.
 */
window.onload = function () {

    var screenWidth = 1024;
    var screenHeight = 768;

    var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });
    var cursors;
    var map;
    var player;
    var platformsLayer;
    var background;
    var waterLayer;

    function preload() {

        game.load.tilemap('mapTiled', 'assets/tileMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('platforms', 'assets/platformTile.png');
        game.load.image('background', 'assets/BG.png');
        game.load.spritesheet('player', 'assets/player.png', 32, 46, 4);
    }

    function create() {

        // Tiled
        game.physics.startSystem(Phaser.Physics.ARCADE);

        background = game.add.tileSprite(0, 0, game.cache.getImage('background').width, game.cache.getImage('background').height, 'background');
        background.fixedToCamera = true;
        map = game.add.tilemap('mapTiled');
        //(name of tileset, name cache key
        map.addTilesetImage('platformTile', 'platforms');


        platformsLayer = map.createLayer('platforms');
        waterLayer = map.createLayer('platforms');
        platformsLayer.resizeWorld();

        map.setCollisionByExclusion([5, 14], true, platformsLayer);

        player = game.add.sprite(256, 256, 'player');

        game.physics.enable(player);
        game.physics.arcade.gravity.y = 250;
        player.anchor.setTo(.5);

        game.camera.follow(player);

        cursors = game.input.keyboard.createCursorKeys();

        player.animations.add('walk');

    }


    function update() {

        game.physics.arcade.collide(player, platformsLayer);

        player.body.velocity.x = 0;

        // Move background image at player position
        background.x = player.x;

        if (cursors.up.isDown) {
            if (player.body.onFloor()) {
                player.body.velocity.y = -300;
            }
        }

        if (cursors.left.isDown) {
            background.tilePosition.x += 1;
            player.body.velocity.x = -150;
            // Flip

            player.scale.setTo(-1, 1);
            player.animations.play('walk', 10, true);
        } else if (cursors.right.isDown) {
            background.tilePosition.x -= 1;
            player.body.velocity.x = 150;
            // Flip
            player.scale.setTo(1, 1);
            player.animations.play('walk', 10, true);
        } else {
            player.animations.stop(null, true);
        }
    }

};