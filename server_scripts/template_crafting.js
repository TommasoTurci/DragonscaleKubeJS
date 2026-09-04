ServerEvents.recipes(event => {

  const transitional = 'kubejs:incomplete_blaze_template';

  // Raw JSON rather than event.recipes.create.sequenced_assembly(): the
  // kubejs-create addon that provides the create.* builders is not loaded.
  // Schema taken from create's own data/create/recipe/sequenced_assembly/*.json.
  const deploy = ingredient => ({
    type: 'create:deploying',
    ingredients: [
      { item: transitional },
      { item: ingredient }
    ],
    results: [
      { id: transitional }
    ]
  });

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'minecraft:netherrack' },
    loops: 8,
    results: [
      { id: 'create_dragons_plus:blaze_upgrade_smithing_template' }
    ],
    transitional_item: { id: transitional },
    sequence: [
      deploy('minecraft:diamond'),
      deploy('minecraft:lapis_lazuli'),
      deploy('minecraft:diamond')
    ]
  }).id('kubejs:blaze_template_sequenced');
});
