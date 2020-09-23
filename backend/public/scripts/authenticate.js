function authenticate() {
    var x = new XMLHttpRequest();
    x.open("POST", "http://localhost:3333/login");
    x.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var d = document.getElementById("login");
    var i = d.getElementsByTagName("input");
    var l = {};
    for (v of i) {
        l[v.name] = v.value;
    }
    x.onreadystatechange = () => {
        if(x.readyState == x.DONE) {
            if (x.status != 200) {
                for (v of i) {
                    v.value = "";
                }
                alert('erro ao logar\nverifique os dados');
            } else {
            }
        }
    }
    x.send(JSON.stringify(l));
}