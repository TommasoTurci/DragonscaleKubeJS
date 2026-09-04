// Metallurgy
ServerEvents.recipes(event => {

    event.remove({
        type: "createbigcannons:melting"
    })


    function melting(material, output) {

        // Nugget -> 8mb
        event.custom({
            type: "createbigcannons:melting",
            heat_requirement: "heated",
            ingredients: [
                {
                    tag: `c:nuggets/${material}`
                }
            ],
            processing_time: 20,
            results: [
                {
                    amount: 8,
                    id: output
                }
            ]
        })


        // Ingot -> 72mb
        event.custom({
            type: "createbigcannons:melting",
            heat_requirement: "heated",
            ingredients: [
                {
                    tag: `c:ingots/${material}`
                }
            ],
            processing_time: 180,
            results: [
                {
                    amount: 72,
                    id: output
                }
            ]
        })

        // Ore -> 72mb
        event.custom({
            type: "createbigcannons:melting",
            heat_requirement: "heated",
            ingredients: [
                {
                    tag: `c:ores/${material}`
                }
            ],
            processing_time: 180,
            results: [
                {
                    amount: 72,
                    id: output
                }
            ]
        })

        // Raw Material -> 72mb
        event.custom({
            type: "createbigcannons:melting",
            heat_requirement: "heated",
            ingredients: [
                {
                    tag: `c:raw_materials/${material}`
                }
            ],
            processing_time: 180,
            results: [
                {
                    amount: 72,
                    id: output
                }
            ]
        })

        // Block -> 648mb
        event.custom({
            type: "createbigcannons:melting",
            heat_requirement: "heated",
            ingredients: [
                {
                    tag: `c:storage_blocks/${material}`
                }
            ],
            processing_time: 1620,
            results: [
                {
                    amount: 648,
                    id: output
                }
            ]
        })
    }

    melting("bronze", "createbigcannons:molten_bronze")

    melting("cast_iron", "createbigcannons:molten_cast_iron")

    melting("nethersteel", "createbigcannons:molten_nethersteel")

    melting("steel", "createbigcannons:molten_steel")


    // Slag metals
    melting("iron", "slag:molten_iron")
    melting("copper", "slag:molten_copper")
    melting("gold", "slag:molten_gold")


})

// Hammer
ServerEvents.recipes(event => {
    event.remove({ output: 'createdieselgenerators:hammer' })

    event.shaped(
        'createdieselgenerators:hammer',
        [
            'AIA',
            'ISI',
            'SIA'
        ],
        {
            A: 'create:andesite_alloy',
            I: 'minecraft:iron_nugget',
            S: 'minecraft:stick'
        }
    )
})

// Milling
// Raw JSON rather than event.recipes.create.milling(): the kubejs-create addon
// that provides the create.* builders and the CreateItem binding is not loaded.
// Schema taken from create's own data/create/recipe/milling/*.json.
ServerEvents.recipes(event => {
    event.custom({
        type: 'create:milling',
        ingredients: [
            { item: 'minecraft:flint' }
        ],
        processing_time: 50,
        results: [
            { chance: 0.75, id: 'create:zinc_nugget' },
            { chance: 0.20, id: 'create:copper_nugget' },
            { chance: 0.20, id: 'minecraft:gold_nugget' }
        ]
    })
})

// Removals
ServerEvents.recipes(event => {

    function removeMaterialDirectSmelting(event, options) {
        let {
            nugget,
            ingot,
            block,
            sources = []
        } = options

        // Remove nugget <-> ingot
        if (nugget && ingot) {
            event.remove({ input: nugget, output: ingot })
            event.remove({ input: ingot, output: nugget })
        }

        // Remove ingot <-> block
        if (ingot && block) {
            event.remove({ input: ingot, output: block })
            event.remove({ input: block, output: ingot })
        }

        // Remove source -> ingot
        if (sources.length && ingot) {
            sources.forEach(source => {
                event.remove({
                    input: source,
                    output: ingot
                })
            })
        }

        // Remove source -> block (optional)
        if (sources.length && block) {
            sources.forEach(source => {
                event.remove({
                    input: source,
                    output: block
                })
            })
        }
    }

    function removeMetalConversions(event, nugget, ingot, block, scrap) {
        let items = [
            nugget,
            ingot,
            block,
            scrap
        ].filter(item => item)

        for (let a of items) {
            for (let b of items) {
                if (a !== b) {
                    event.remove({
                        input: a,
                        output: b
                    })
                }
            }
        }
    }

    event.remove({ type: 'slag:melting' })

    removeMaterialDirectSmelting(event, {
        nugget: 'minecraft:iron_nugget',
        ingot: 'minecraft:iron_ingot',
        block: 'minecraft:iron_block',

        sources: [
            'minecraft:raw_iron',
            'create:crushed_raw_iron',
            'minecraft:iron_ore',
            'minecraft:deepslate_iron_ore',
            'minecraft:raw_iron_block',
            'quark:raw_iron_bricks'
        ]
    })

    removeMetalConversions(
        event,
        'minecraft:iron_nugget',
        'minecraft:iron_ingot',
        'minecraft:iron_block'
    )

    removeMetalConversions(
        event,
        'createbigcannons:steel_scrap',
        'createbigcannons:steel_ingot',
        'createbigcannons:steel_block'
    )
})