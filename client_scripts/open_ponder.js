ClientEvents.lang('en_us', event => {
    // Registers a localized name for your custom text button action
    event.add('ftbquests.task.ponder_button', 'Open Ponder Guide');
});

// Create a client-side command that opens the ponder screen for a specific item ID
ClientEvents.commandRegistry(event => {
    const { commands } = event;
    
    event.register(
        commands.literal('open_ponder')
        .then(commands.argument('item', Arguments.item.create())
        .executes(ctx => {
            let itemId = Arguments.item.getResult(ctx, 'item');
            // This leverages Create's client-side Ponder UI registry
            global.net.minecraft.client.Minecraft.getInstance().execute(() => {
                // Safely invokes the Create UI layer to push the ponder screen
                com.simibubi.create.foundation.ponder.PonderRegistry.openScreen(itemId);
            });
            return 1;
        }))
    );
});
