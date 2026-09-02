ServerEvents.recipes(event => {

  const transitional = 'kubejs:incomplete_blaze_template';

  event.recipes.create.sequenced_assembly(
    ['create_dragons_plus:blaze_upgrade_smithing_template'], // output
    'minecraft:netherrack',
    [
      event.recipes.create.deploying(transitional, [
        transitional,
        'minecraft:diamond'
      ]),

      event.recipes.create.deploying(transitional, [
        transitional,
        'minecraft:lapis_lazuli'
      ]),

      event.recipes.create.deploying(transitional, [
        transitional,
        'minecraft:diamond'
      ])
    ]
  )
  .transitionalItem(transitional)
  .loops(8)
  .id('kubejs:blaze_template_sequenced');
});