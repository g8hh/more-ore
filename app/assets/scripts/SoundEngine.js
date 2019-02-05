let SoundEngine = function() {

    this.play = ( sound ) => {
        SE[`${ sound }`]._volume = S.prefs.sfx_volume
        SE[`${ sound }`].play()
    }

    this.ore_hover = new Howl({
        src: [ './app/assets/sounds/ore_hover.wav' ]
    })

    this.ore_hit = new Howl({
        src: [ './app/assets/sounds/ore_hit.wav' ]
    })

    this.ore_weak_spot_hit = new Howl({
        src: [ './app/assets/sounds/ore_weak_spot_hit.wav' ]
    })

    this.ore_destroyed = new Howl({
        src: [ './app/assets/sounds/ore_destroyed.wav' ]
    })

    this.ore_percentage_lost = new Howl({
        src: [ './app/assets/sounds/ore_percentage_lost.wav' ]
    })

    this.not_enough = new Howl({
        src: [ './app/assets/sounds/not_enough.wav' ]
    })

    this.buy_sound = new Howl({
        src: [ './app/assets/sounds/buy_sound.wav' ]
    })

    this.store_item_hover = new Howl({
        src: [ './app/assets/sounds/store_item_hover.wav' ]
    })

    this.combo_shield_break = new Howl({
        src: [ './app/assets/sounds/combo_shield_break.wav' ]
    })

    this.refine = new Howl({
        src: [ './app/assets/sounds/refine.wav' ]
    })

    this.boss_hit_1 = new Howl({
        src: [ './app/assets/sounds/boss_hit_1.wav' ]
    })

    this.boss_hit_2 = new Howl({
        src: [ './app/assets/sounds/boss_hit_2.wav' ]
    })

    this.quest_complete = new Howl({
        src: [ './app/assets/sounds/quest_complete.wav' ]
    })

    this.quest_failed = new Howl({
        src: [ './app/assets/sounds/quest_failed.wav' ]
    })

    this.scroll_successful = new Howl({
        src: [ './app/assets/sounds/scroll_successful.wav' ]
    })

    this.scroll_failed = new Howl({
        src: [ './app/assets/sounds/scroll_failed.wav' ]
    })

    this.socket_gem = new Howl({
        src: [ './app/assets/sounds/socket_gem.wav' ]
    })

    this.gold_nugget_click = new Howl({
        src: [ './app/assets/sounds/gold_nugget_click.wav' ]
    })

    this.skill_level_up = new Howl({
        src: [ './app/assets/sounds/skill_level_up.wav' ]
    })

    this.smith_upgrade_start = new Howl({
        src: [ './app/assets/sounds/smith_upgrade_start.wav' ]
    })

    this.misc = new Howl({
        src: [ './app/assets/sounds/misc.wav' ]
    })

}