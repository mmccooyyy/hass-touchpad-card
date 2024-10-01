# Home Assistant Touchpad Card
A card that accepts swipes and taps to run Home Assistant actions.

# Setup:
Example card configuration:
```yaml
type: custom:touchpad-card
left_action:
  action: call-service
  service: script.living_room_apple_tv_left
  target: {}
up_action:
  action: call-service
  service: script.living_room_apple_tv_up
  target: {}
right_action:
  action: call-service
  service: script.living_room_apple_tv_right
  target: {}
down_action:
  action: call-service
  service: script.living_room_apple_tv_down
  target: {}
click_action:
  action: call-service
  service: script.living_room_apple_tv_select
  target: {}
threshold: 1
```

There are 5 required config values:
- `left_action` - the action taken when swiping left
- `up_action` - the action taken when swiping up
- `right_action` - the action taken when swiping right
- `down_action` - the action taken when swiping down
- `click_action` - the action taken when you tap on the touchpad
- `threshold` - the sensitivity, 1 is very sensitive, while 50+ is very insensitive