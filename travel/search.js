function searchCards() {
    var input, filter, cards, card, h3, i, txtValue;
    input = document.getElementById('search-bar');
    filter = input.value.toUpperCase();
    cards = document.getElementsByClassName('card');

    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        h3 = card.getElementsByTagName('h3')[0];
        txtValue = h3.textContent || h3.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    }
}