const formatAmount = (amount)=>{
    return Intl.NumberFormat(
        'en-US',
        {style: 'currency', currency: 'USD', minimumFractionDigits: 2}
    ).format(amount)
}

export default formatAmount;