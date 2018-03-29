{ id: 'PAY-2VP290721T529061BLK6USBQ',
  intent: 'sale',
  state: 'created',
  payer: { payment_method: 'paypal' },
  transactions:
   [ { amount: [Object],
       description: 'This is the payment description.',
       item_list: [Object],
       related_resources: [] } ],
  create_time: '2018-03-29T20:13:58Z',
  links:
   [ { href: 'https://api.sandbox.paypal.com/v1/payments/payment/PAY-2VP290721T529061BLK6USBQ',
       rel: 'self',
       method: 'GET' },
     { href: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-8P237771W7928792J',
       rel: 'approval_url',
       method: 'REDIRECT' },
     { href: 'https://api.sandbox.paypal.com/v1/payments/payment/PAY-2VP290721T529061BLK6USBQ/execute',
       rel: 'execute',
       method: 'POST' } ],
  httpStatusCode: 201 }
approval_url: { href: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-8P237771W7928792J',
  method: 'REDIRECT' }


  { id: 'PAY-2LC97582WU9230707LK6US6I',
    intent: 'authorize',
    state: 'created',
    payer: { payment_method: 'paypal' },
    transactions:
     [ { amount: [Object],
         description: 'This is the payment description.',
         item_list: [Object],
         related_resources: [] } ],
    create_time: '2018-03-29T20:15:53Z',
    links:
     [ { href: 'https://api.sandbox.paypal.com/v1/payments/payment/PAY-2LC97582WU9230707LK6US6I',
         rel: 'self',
         method: 'GET' },
       { href: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-8790019898214102X',
         rel: 'approval_url',
         method: 'REDIRECT' },
       { href: 'https://api.sandbox.paypal.com/v1/payments/payment/PAY-2LC97582WU9230707LK6US6I/execute',
         rel: 'execute',
         method: 'POST' } ],
    httpStatusCode: 201 }
  approval_url: { href: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-8790019898214102X',
    method: 'REDIRECT' }
