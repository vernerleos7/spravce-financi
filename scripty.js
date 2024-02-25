document.addEventListener("DOMContentLoaded", function() {
    let stavUctu = 0;
    const stavUctuElement = document.getElementById('aktualni-stav');

    function aktualizovatStavUctu() {
        stavUctuElement.textContent = `${stavUctu.toFixed(2)} Kč`;
    }

    let transakce = [];

    function pridatTransakci(castka, typ, kategorie) {
        const novaTransakce = {
            castka: castka,
            typ: typ,
            kategorie: kategorie
        };

        transakce.push(novaTransakce);

        if (typ === 'příjem') {
            stavUctu += castka;
        } else {
            stavUctu -= castka;
        }

        const seznamTransakci = document.getElementById('seznam-transakci');
        const transakceItem = document.createElement('li');
        transakceItem.textContent = `${typ.charAt(0).toUpperCase() + typ.slice(1)}: ${castka.toFixed(2)} Kč, Kategorie: ${kategorie}`;
        seznamTransakci.appendChild(transakceItem);

        aktualizovatStavUctu();
    }

    document.getElementById('pridat-transakci').addEventListener('submit', function(event) {
        event.preventDefault();

        const castka = parseFloat(document.getElementById('castka').value);
        const typ = document.getElementById('typ').value;
        const kategorie = document.getElementById('kategorie').value;

        if (isNaN(castka) || castka <= 0) {
            alert('Zadejte platnou kladnou částku.');
            return;
        }

        pridatTransakci(castka, typ, kategorie);
    });

    aktualizovatStavUctu();

    document.getElementById('dph-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var cenaBezDPH = parseFloat(document.getElementById('cena-bez-dph').value);
        var sazbaDPH = parseFloat(document.getElementById('sazba-dph').value) / 100;
        
        var cenaSDPH = cenaBezDPH * (1 + sazbaDPH);
        var rozdil = cenaSDPH - cenaBezDPH;
        
        document.getElementById('vysledek-dph').innerHTML = '<p>Cena s DPH: ' + cenaSDPH.toFixed(2) + ' Kč</p><p>Rozdíl: ' + rozdil.toFixed(2) + ' Kč</p>';
    });

    document.getElementById('prevod-meny-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var zakladniMena = document.getElementById('zakladni-mena').value;
        var cilovaMena = document.getElementById('cilova-mena').value;
        var castkaKPrevodu = parseFloat(document.getElementById('castka-k-prevodu').value);
        

        var kurzZakladniNaEUR = {
            'CZK': 0.040,
            'EUR': 1,
            'USD': 1.09
        };
        var kurzCilovaNaEUR = {
            'CZK': 25,
            'EUR': 1,
            'USD': 1 / 1.12
        };
        
        var castkaV_EUR = castkaKPrevodu * kurzZakladniNaEUR[zakladniMena];
        var castkaV_Cilove = castkaV_EUR * kurzCilovaNaEUR[cilovaMena];
        
        document.getElementById('vysledek-prevodu').innerHTML = '<p>Převedená částka: ' + castkaV_Cilove.toFixed(2) + ' ' + cilovaMena + '</p>';
    });
});
