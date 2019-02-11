let chance_for_prefix = .6
let chance_for_good_prefix = .8
let chance_for_suffix = .1


let Pickaxe = function( item_level ) {

    this.generation_bonus = _get_pickaxe_generation_bonus()

    this.level = _get_pickaxe_level( item_level )
    this.rarity = _get_pickaxe_rarity()
    this.sockets = _get_pickaxe_sockets( this.rarity )
    this.material = _get_pickaxe_material()
    this.prefix = _get_pickaxe_prefix()
    this.suffix = _get_pickaxe_suffix( this.rarity )
    this.multiplier = _get_pickaxe_multiplier( this )
    this.sharpness = _get_pickaxe_sharpness( this.level, this.multiplier.sharpness )
    this.hardness = _get_pickaxe_hardness( this.level, this.multiplier.hardness )
    this.damage = _get_pickaxe_damage( this.generation_bonus, this.level )
    this.num_of_upgrades = _get_pickaxe_num_upgrades( this.rarity.name )
    this.used_upgrades = 0

    this.name = _get_pickaxe_name( this )

}


// IDEAS
/*
    Rage stat - adds damage specifically in quests
    Luck stat - Crits?
    Endurance - quest speed?

    After first refine, pickaxes drop with more stats. 
*/

let _get_pickaxe_generation_bonus = () => {

    let bonus = 0

    if ( S.stats.times_defined >= 1 ) bonus++
    if ( S.stats.times_refined >= 5 ) bonus++
    if ( S.stats.times_refined >= 10 ) bonus++
    if ( S.stats.times_refined >= 20 ) bonus++

    return bonus
}

let _get_pickaxe_level = ( item_level ) => {

    let level = item_level

    if ( Math.random() <= .2 ) level -= get_random_num( 1, item_level / 2 )
    if ( level < 1 ) level = 1

    if ( S.generation.level > 0 )  level += S.generation.level * Math.random()


    return Math.round( level )
}

let _get_pickaxe_rarity = () => {

    let chance = Math.random() + S.pickaxe_quality_bonus

    let rarities = [
        {
            name: 'Common',
            multiplier: 0
        }, {
            name: 'Uncommon',
            multiplier: .02
        }, {
            name: 'Rare',
            multiplier: .05
        }, {
            name: 'Epic',
            multiplier: .3
        }, {
            name: 'Legendary',
            multiplier: .5
        }, {
            name: 'Mythic',
            multiplier: 1
        }
    ]

    let rarity
    if ( chance <= 1 ) rarity = rarities[ 0 ]
    if ( chance < .6 )  rarity = rarities[ 1 ]
    if ( chance < .3 )  rarity = rarities[ 2 ]
    if ( chance < .1 )  rarity = rarities[ 3 ]
    if ( chance < .03 ) rarity = rarities[ 4 ]
    if ( chance < .01 ) rarity = rarities[ 5 ]

    return rarity
}

let _get_pickaxe_sockets = ( rarity ) => {

    let sockets = {}
    let amount = 0

    switch ( rarity ) {

        case 'Common':
            amount = select_random_from_arr( [ 0, 0, 1 ] )
            break

        case 'Uncommon':
            amount = select_random_from_arr( [ 1, 1, 2 ] )
            break

        case 'Rare':
            amount = select_random_from_arr( [ 1, 2, 2 ] )
            break
        
        case 'Epic':
            amount = select_random_from_arr( [ 2, 2, 3 ] )
            break

        case 'Legendary':
            amount = select_random_from_arr( [ 3, 4, 5, 6 ] )
            break

        case 'Mythic':
            amount = select_random_from_arr( [ 4, 5, 6 ] )
            break
    }

    sockets.amount = amount
    sockets.socket = []

    for ( let i = 0; i < sockets.amount; i++ ) {
        sockets.socket.push( {} )
    }

    return sockets
}

let _get_pickaxe_material = () => {
    
    let chance = Math.random() + S.pickaxe_quality_bonus

    let materials = [
        {
            names: [ 'Wood', 'Plastic', 'Cardboard', 'Glass', 'Tin' ],
            multiplier: -.03
        }, {
            names: [ 'Stone', 'Bronze', 'Copper', 'Bone', 'Lead' ],
            multiplier: .01
        }, {
            names: [ 'Iron', 'Silver', 'Gold' ],
            multiplier: .05
        }, {
            names: [ 'Steel', 'Platinum' ],
            multiplier: .1
        }, {
            names: [ 'Diamond', 'Adamantite', 'Titanium', 'Alien' ],
            multiplier: .3
        }
    ]

    let material = materials[ 0 ]

    if ( chance < .5 ) material = materials[ 1 ]
    if ( chance < .2 ) material = materials[ 2 ]
    if ( chance < .1 ) material = materials[ 3 ]
    if ( chance < .05 ) material = materials[ 4 ]

    material.name = select_random_from_arr( material.names )

    return {
        name: material.name,
        multiplier: material.multiplier
    }
}

let _get_pickaxe_prefix = () => {

    let prefixes = [
        // positive prefixes
        [
            {
                name: select_random_from_arr( [ 'Superior', 'Greater', 'Refined', 'Gigantic', 'Polished' ] ),
                modifier: [
                    {
                        stat: 'sharpness',
                        amount: .05
                    }, {
                        stat: 'hardness',
                        amount: .05
                    }
                ]
            }, {
                name: select_random_from_arr( [ 'Pointy', 'Sharp', 'Razor', 'Acute', 'Fine' ] ),
                modifier: [
                    {
                        stat: 'sharpness',
                        amount: .05
                    }
                ]
            }, {
                name: select_random_from_arr( [ 'Durable', 'Hefty', 'Hard', 'Reliable', 'Strong' ] ),
                modifer: [
                    {
                        stat: 'hardness',
                        amount: .05 
                    }
                ]
            }, {
                name: 'Sharp but Flimsy',
                modifier: [
                    {
                        stat: 'sharpness',
                        amount: .2
                    }, {
                        stat: 'hardness',
                        amount: -.5
                    }
                ]
            }, {
                name: 'Hard but Dull',
                modifier: [
                    {
                        stat: 'sharpness',
                        amount: -.5
                    }, {
                        stat: 'hardness',
                        amount: .2
                    }
                ]
            }
        ],
        // negative prefixes
        [
            {
                name: select_random_from_arr( [ 'Tiny', 'Awkward', 'Shoddy', 'Broken', 'Busted', 'Cracked', 'Chipped', 'Damaged', 'Defective' ] ),
                modifier: [
                    {
                        stat: 'sharpness',
                        amount: -.05
                    }, {
                        stat: 'hardness',
                        amount: -.05
                    }
                ]
            }, {
                name: select_random_from_arr( [ 'Dull', 'Blunt' ] ),
                modifier: [
                    {
                        stat: 'sharpness',
                        amount: -.05
                    }
                ]
            }, {
                name: select_random_from_arr( [ 'Soft', 'Squishy', 'Thin' ] ),
                modifier: [
                    {
                        stat: 'hardness',
                        amount: -.05
                    }
                ]
            }
        ]
    ]

    if ( Math.random() <= chance_for_prefix ) {
        
        let prefix = {}

        if ( Math.random() <= chance_for_good_prefix ) {
            prefix = select_random_from_arr( prefixes[ 0 ] )
        } else {
            prefix = select_random_from_arr( prefixes[ 1 ] )
        }

        return prefix
    }
}

let _get_pickaxe_suffix = ( rarity ) => {

    let suffixes = [
        {
            name: 'of the Giant',
            modifier: [
                {
                    stat: 'sharpness',
                    amount: .5
                }, {
                    stat: 'hardness',
                    amount: .5
                }
            ]
        }, {
            name: 'of Keen Eyes',
            modifier: [
                {
                    stat: 'sharpness',
                    amount: 1.5
                }
            ]
        }, {
            name: 'of Durability',
            modifier: [
                {
                    stat: 'hardness',
                    amount: 1.5
                }
            ]
        }
    ]

    if ( Math.random() < chance_for_suffix || rarity.name == 'Legendary' || rarity.name == 'Mythic' ) {
        return select_random_from_arr( suffixes )
    }
}

let _get_pickaxe_multiplier = ( p ) => {

    let multiplier = {
        sharpness: 0,
        hardness: 0
    }

    multiplier.sharpness += p.rarity.multiplier
    multiplier.hardness += p.rarity.multiplier

    multiplier.sharpness += p.material.multiplier
    multiplier.hardness += p.material.multiplier

    if ( p.prefix ) {

        p.prefix.modifier.forEach( modification => {
            multiplier[ modification.stat ] += modification.amount
        })
    }

    if ( p.suffix ) {

        p.suffix.modifier.forEach( modification => {
            multiplier[ modification.stat ] += modification.amount
        })
    }

    return multiplier
}

let _get_pickaxe_sharpness = ( level, multiplier ) => {

    let level_bonus = Math.round( level / 10 )
    let sharpness = get_random_num( 80, 120 )

    sharpness += sharpness * level_bonus
    sharpness += sharpness * multiplier

    return sharpness

}

let _get_pickaxe_hardness = ( level, multiplier ) => {

    let level_bonus = Math.round( level / 10 )
    let hardness = get_random_num( 80, 120 )

    hardness += hardness * level_bonus
    hardness += hardness * multiplier

    return hardness

}

let _get_pickaxe_damage = ( bonus, level ) => {

    let damage = 1
    let max_damage = level * ( 5 + bonus )

    damage += get_random_num( max_damage / 5, max_damage )

    return damage
}

let _get_pickaxe_num_upgrades = ( rarity ) => {

    let num = 3

    switch ( rarity ) {

        case 'Common':
            num += select_random_from_arr( [ 0, 1, 1, 2 ] )
            break
        
        case 'Uncommon':
            num += select_random_from_arr( [ 1, 2, 2, 3 ] )
            break
        
        case 'Rare':
            num += select_random_from_arr( [ 2, 3, 3, 4 ] )
            break

        case 'Epic':
            num += select_random_from_arr( [ 3, 4, 4, 5 ] )
            break

        case 'Legendary':
            num += select_random_from_arr( [ 4, 5, 5, 6 ] )
            break

        case 'Mythic':
            num += select_random_from_arr( [ 5, 6, 6, 7 ] )
            break
    }

    return num
}

let _get_pickaxe_name = ( p ) => {

    let name = ''

    if ( p.prefix ) name += p.prefix.name + ' '

    name += `${ p.material.name } Pickaxe`

    if ( p.suffix ) name += ` ${ p.suffix.name }`

    return name
}