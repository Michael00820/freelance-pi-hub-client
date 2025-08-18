export async function authenticate() {
  if (window.Pi?.authenticate) {
    const scopes = ['username','payments']
    return await window.Pi.authenticate(scopes, onIncompletePaymentFound)
  }
  return { user: { username: 'sandbox_user' } }
}
function onIncompletePaymentFound(payment) { console.log('Found incomplete payment:', payment) }

export async function createPayment({ amount, memo, metadata }) {
  if (window.Pi?.createPayment) {
    return await window.Pi.createPayment(
      { amount, memo, metadata },
      { onReadyForServerApproval, onReadyForServerCompletion, onCancel, onError }
    )
  }
  return { txid: 'demo_tx_' + Math.random().toString(36).slice(2) }
}
function onReadyForServerApproval(paymentId){ console.log('Ready for approval', paymentId) }
function onReadyForServerCompletion(paymentId, txid){ console.log('Ready for completion', paymentId, txid) }
function onCancel(paymentId){ console.log('Payment cancelled', paymentId) }
function onError(error, paymentId){ console.error('Payment error', error, paymentId) }