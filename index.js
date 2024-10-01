let startX = 0
let startY = 0
let currentX = 0
let currentY = 0
let isSwiping = false
let length = 0
let threshold = 1
let cb = function(){}

let touchStartListener = function(e) {
  const touch = e.touches[0]
  startX = touch.pageX
  startY = touch.pageY
  isSwiping = true // Track that the user has started a swipe
}

let touchMoveListener = function(e) {
  if (isSwiping) {
    const touch = e.touches[0]
    currentX = touch.pageX
    currentY = touch.pageY
    length++

    let diffX = currentX - startX
    let diffY = currentY - startY

    if (Math.abs(diffX) > Math.abs(diffY)) { // Check if it's a horizontal swipe
      if (diffX < 0) {
        if (length >= threshold) {
          length = 0
          cb('left')
        }
      } else {
        if (length >= threshold) {
          length = 0
          cb('right')
        }
      }
    } else {
      if (diffY < 0) {
        if (length >= threshold) {
          length = 0
          cb('up')
        }
      } else {
        if (length >= threshold) {
          length = 0
          cb('down')
        }
      }
    }
  }
}

let touchEndListener = function() {
  isSwiping = false // Reset swipe tracking
  length = 0
}

let clickListener = function() {
  cb('click')
}

let touchpadStyle = `
  height: 20em; 
  touch-action: none;
`

class TouchpadCard extends HTMLElement {
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
        <ha-card>
          <div class="touchpad" style="${touchpadStyle}"></div>
        </ha-card>
      `
      this.content = this.querySelector('div')
    }

    // Get the config
    const { left_action, up_action, right_action, down_action, click_action, threshold: t } = this.config
    threshold = t

    cb = function(dir) {
      switch(dir) {
        case 'left':
          hass.callService('script', 'turn_on', {
            entity_id: left_action.service
          })
          break
        case 'right':
          hass.callService('script', 'turn_on', {
            entity_id: right_action.service
          })
          break
        case 'up':
          hass.callService('script', 'turn_on', {
            entity_id: up_action.service
          })
          break
        case 'down':
          hass.callService('script', 'turn_on', {
            entity_id: down_action.service
          })
          break
        case 'click':
          hass.callService('script', 'turn_on', {
            entity_id: click_action.service
          })
          break
        default:
          // do nothing
      }
    }

    this.handleSwipe(this.content)
  }

  handleSwipe(element) {
    // Listen for touch events
    element.addEventListener('touchstart', touchStartListener)
    element.addEventListener('touchmove', touchMoveListener)
    element.addEventListener('touchend', touchEndListener)

    // Listen for the click event
    element.addEventListener('click', clickListener)
  }

  // The user supplied configuration.
  setConfig(config) {
    if (!config.left_action) {
      throw new Error('You need to define a left action')
    }
    if (!config.up_action) {
      throw new Error('You need to define a up action')
    }
    if (!config.right_action) {
      throw new Error('You need to define a right action')
    }
    if (!config.down_action) {
      throw new Error('You need to define a down action')
    }
    if (!config.click_action) {
      throw new Error('You need to define a click action')
    }
    if (!config.threshold) {
      throw new Error('You need to define a threshold')
    }
    this.config = config
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns in masonry view
  getCardSize() {
    return 3
  }

  // The rules for your card for sizing your card if the grid in section view
  getLayoutOptions() {
    return {
      grid_rows: 3,
      grid_columns: 2,
      grid_min_rows: 3,
      grid_max_rows: 3,
    }
  }
}

customElements.define('touchpad-card', TouchpadCard)