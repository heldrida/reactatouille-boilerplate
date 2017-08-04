var texts = {
  initialScreen: {
    enter_the_code: 'Type in the code (word or number) associated with your item(s).',
    enter_code_length_error: 'Oops! Please provide a valid reservation number',
    when_finish_press_find: 'Nearly there! Press FIND MY RESERVATION when you finish typing your code',
    initial_screen_title: 'Collect a reservation',
    cta_find_reservation: 'Find my reservation'
  },
  sidebarCheckout: {
    subtotal: 'Subtotal',
    carrier_bags: 'Carrier bags',
    your_savings: 'Your savings',
    total: 'total',
    cta_pay: 'Pay now',
    cta_add_more_products: 'ADD MORE ITEM(S)'
  },
  navbar: {
    items_at: 'item(s) at'
  },
  trolley: {
    title: 'Your trolley'
  },
  paymentScreen: {
    title: 'Nearly there! Please pay to complete your reservation',
    video: {
      card: {
        title: 'Chip & Pin',
        desc: 'Pop your card in the card reader and enter your PIN.'
      },
      contactless: {
        title: 'Contactless',
        desc: 'Tap your contactless card against the card reader and wait for confirmation.'
      }
    }
  },
  paymentComplete: {
    title: 'Payment complete!',
    take_receipt_to: 'Please take your receipt to the collection point...',
    cta_new_customer: 'New customer? Tap here'
  },
  modal: {
    generic_network_error: {
      title: 'Oops!',
      description: 'Sorry - something did not go through! Please try again or contact a member of our staff!',
      cta: 'try again'
    },
    generic_error: {
      title: 'Uh oh!',
      cta: 'try again'
    },
    reservation_not_found: {
      title: 'Uh Oh!',
      description: 'We can’t find a reservation with that code...',
      cta: 'try again'
    },
    payment_authorised: {
      title: 'Payment authorised',
      description: 'Your receipt is now being printed. This will display the Collection Point where you should pick up your item(s).'
    },
    payment_failed: {
      title: 'Uh oh!',
      description: 'We were unable to process your payment. If the problem persists, contact a member of our staff to complete your order. Thank you!',
      ctaCancel: 'New Customer',
      ctaTryAgain: 'Try Again'
    },
    payment_swipe: {
      title: 'Oops!',
      description: 'We are unable to process swipe card payments here. Please insert a chip and pin enabled card or go to a till to complete your order.',
      ctaCancel: 'New Customer',
      ctaTryAgain: 'Try Again'
    },
    cancel_reservation_checkout: {
      title: 'Leave without completing?',
      description: 'Tap New Customer to start again',
      ctaCancel: 'Cancel',
      ctaReset: 'New Customer'
    },
    ghost_countdown_restart: {
      title: 'Wakey wakey!',
      description1: 'Want to complete your collection? Then look lively and press the green button.',
      description2: 'Your session will automatically end after $1 seconds of inactivity.',
      countdown_title: 'Session ending in',
      ctaNewCustomer: 'New customer? Tap here',
      ctaContinue: 'Continue with collection'
    },
    basket_item_error: {
      title: 'Oh no!',
      cta: 'Ok'
    }
  },
  reservationFinder: {
    list: {
      title: 'Reservation item(s)',
      description: 'Click the "Add to Basket" button on the listed item! Once you\'ve added an item to your Basket, you can keep searching or browsing until your Basket contains all the items you want to order.'
    }
  },
  ambiguousReservation: {
    title: 'We found more than one reservation. Which is yours?',
    description1: 'Option <span>$1</span> has <span>$2</span> item(s).',
    ctaSelect: 'select',
    infoDescription: 'If you cannot find your reservation please go to a manned till where a member of staff will be happy to help.',
    ctaBack: 'go back'
  },
  out_of_service: {
    title: 'Houston, we have a problem...',
    desc: 'Please use an alternative or speak to a member of staff',
    configurator_manually_set_msg: 'Manual lock',
    printer_error_msg: 'Printer',
    whoami_error_msg: 'Whoami'
  },
  coming_soon: {
    title: 'Exciting news!',
    desc: 'Our new kiosk is coming to this store soon!'
  },
  userHints: {
    skuFinder: {
      default: 'Use the onscreen keyboard to enter the catalogue number for your item',
      valid: 'Great! You can now press find my products to continue!',
      keepTyping: 'Almost there! Keep typing, a product has 7 digits!',
      error: 'Hold on! There\'re some digits missing! Please complete!'
    },
    reservationFinder: {
      default: 'Type in the code (word or number) associated with your item(s).',
      valid: 'Nearly there! Press FIND MY RESERVATION when you finish typing your code',
      keepTyping: 'Nearly there! Press FIND MY RESERVATION when you finish typing your code',
      error: 'Oops! Please provide a valid reservation number'
    }
  },
  product_row: {
    add_to_basket: 'Add to basket'
  }
}

module.exports = texts
