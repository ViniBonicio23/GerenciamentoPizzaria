import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzaria.db');
    return cx;
}

export async function createTableProduto() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbPizzas
        (
            id text not null primary key,
            descricao text not null,
            categoria text not null,
            precoUnitario text not null          
        )`;
        //const query = `DROP TABLE tbPizzas`;

        let dbCx = getDbConnection();        
        
        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export async function createTableVenda() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbVendas
        (
            idVenda text not null primary key,
            produtosVendidos text not null,
            precosPizza text not null,
            dataVenda text not null,
            precoTotal text not null
        )`;
        //const query = `DROP TABLE tbVendas`;

        let dbCx = getDbConnection();        
        
        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export async function createTableCategoria() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbCategoria
        (
            idCat text not null primary key,
            categoria text not null
        )`;
        //const query = `DROP TABLE tbCategoria`;

        let dbCx = getDbConnection();        
        
        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function obtemTodasPizzas() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbPizzas';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            cod: registros.rows.item(n).id,
                            desc: registros.rows.item(n).descricao,
                            cat: registros.rows.item(n).categoria,
                            preco: registros.rows.item(n).precoUnitario
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemTodasVendas() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbVendas';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codVenda: registros.rows.item(n).idVenda,
                            descs: registros.rows.item(n).produtosVendidos,
                            precos: registros.rows.item(n).precosPizza,
                            data: registros.rows.item(n).dataVenda,
                            precoTotal: registros.rows.item(n).precoTotal,
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemTodasCategorias() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbCategoria';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codCat: registros.rows.item(n).idCat,
                            categoria: registros.rows.item(n).categoria,
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemParcialmentePizzas(pizza) {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbPizzas where categoria=?';
            tx.executeSql(query, [pizza],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            cod: registros.rows.item(n).id,
                            desc: registros.rows.item(n).descricao,
                            cat: registros.rows.item(n).categoria,
                            preco: registros.rows.item(n).precoUnitario
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function adicionaPizza(pizza) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbPizzas (id, descricao , categoria, precoUnitario) values (?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [pizza.cod, pizza.desc, pizza.cat, pizza.preco],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function adicionaVenda(venda) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbVendas (idVenda, produtosVendidos , precosPizza, dataVenda, precoTotal) values (?,?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [venda.codVenda, venda.descs, venda.precos, venda.data, venda.precoTotal],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function adicionaCategoria(cat) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbCategoria (idCat, categoria) values (?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [cat.codCat, cat.categoria],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function alteraPizza(pizza) {
    return new Promise((resolve, reject) => {
        let query = 'update tbPizzas set descricao=?, categoria=?, precoUnitario=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [pizza.desc, pizza.cat, pizza.preco, pizza.cod],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function alteraCategoria(cat) {
    return new Promise((resolve, reject) => {
        let query = 'update tbCategoria set categoria=? where idCat=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [cat.categoria, cat.codCat],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function excluiPizza(id) {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbPizzas where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function excluiCategoria(id) {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbCategoria where idCat=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}