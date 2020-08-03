import React, {Component} from 'react';
import PropTypes from 'prop-types'

export class Posts extends Component {


    state = {
        posts: {}, //Listado de POST recibidos
        currentPage:1, //Página actual
        postPerPage:6 //Post por páginas

    }

    //Evento del CLICK para cambiar de páginas
    handleClick=(event) =>{
        //Guardamos en la página actual (estado) el número de página que ha activado el evento
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    //Cuando se ha terminado de montar el DOM, recibimos los posts
    componentWillMount() {
        this._getPosts()
    }

    _getPosts()
    {
        //Hacemos la llamada a la API y recibimos los POST
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                this.setState({posts})
                //Como lo guardamos en un estado, forzamos un update del elemento
            })
    }


    render()
    {
        //Recogemos las varuables del estado para trabajar mejor con ellas
        const listado = Object.values(this.state.posts)
        const current = this.state.currentPage
        const perpage = this.state.postPerPage

        //Con estos indices, recogemos los elementos de la página en la que estamos
        const indexOfLast = current * perpage; //Índice último de la página actual
        const indexOfFirst = indexOfLast - perpage; //Índice inicial de la página actual
        const currentTodos = listado.slice(indexOfFirst, indexOfLast);//Elementos correspondientes entre el indice inicial y final

        const pageNumbers = [];//Listado de páginas
        //Calculamos la cantidad de páginas que tendrá el documento
        //dividiento la cantidad total de elementos por la cantidad de elementos por página
        for (let i = 1; i <= Math.ceil(listado.length / perpage); i++) {
            pageNumbers.push(i)//Añadimos el número de página al listado
        }

        //Renderizamos la paginaciçon
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                //Por cada número de página, generamos un elemento page-item
                //Que estará activo solamente si coincide con la página actual
                <li
                    className={ this.state.currentPage===number  ? 'page-item active' : 'page-item' }
                    key={number}
                >
                    <a
                        className="page-link"
                        href="#"
                        id={number}
                        onClick={this.handleClick}>
                    {number}
                    </a>
                </li>
            );
        });

        console.log(listado)

        //Mostramos el listado de post, lo hacemos en 'cards' para que quede más vistoso.
        //Al final, mostramos la paginación
        return(
            <div>
           <div className='card-columns pt-2'>
               {
                   currentTodos.map(post => {
                       return (
                       <div key={post.id} className='card p-3 text-white bg-info'>
                           <h5 className="card-title">{post.title}</h5>
                           <p className='card-text'>{post.body}</p>

                       </div>

                       )
                   })
               }

           </div>
                <div>
                    <ul className="pagination justify-content-center flex-wrap">
                        {renderPageNumbers}
                    </ul>
                </div>
            </div>

        )
    }
}