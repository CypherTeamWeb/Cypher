import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Card from '../components/Card';
import GamesJsons from '../Configs/Games.json'
import { LangState } from '../components/Header';

type itemObjType = {
  price: number,
  title: string,
  ImageUrl: string,
  company: string,
  sale?: number,
  proccentSale?: number;
  id: number;
}

const Home: React.FC = () => {
    let GamesJson = GamesJsons
    const value = useSelector(ValueState)
    const filtredItems = GamesJson.filter((obj: itemObjType) => obj.title.toLowerCase().includes(value.toLowerCase()));
    const lang = useSelector(LangState);

    return (
        <>
            <div className='wrapper'>
              <div className='Loading'></div>
              <main>
                  <Header />
                  
                  <div className="background" />

                  <div className="featured-release">
                    <span>{lang === 'Русский' ? 'Избранный выпуск' : 'Featured Release'}</span>
                    <div className="title">
                      <h1>Cyberpunk 2077</h1>
                    </div>
                    <p className="description">{lang === 'Русский' ? 'Окунитесь в захватывающий открытый мир Ночного города, где власть, гламур и модификация тела - это все.' :'Enter the immersive open world of Night City, where power, glamour, and body modification are everything.'}</p>

                    <div className="buttons">
                      <div className="buy">{lang === 'Русский' ? 'Купить Сейчас' : 'Buy Now'} $59.99</div>
                      <div className="watch-trailer">
                        <svg style={{marginRight: lang === 'Русский' ? '130px' : '100px'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <p>{lang === 'Русский' ? 'Смотреть трейлер' : 'Watch Trailer'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="Featured-games" id='Featured-games'>
                    <h2 className="title firstTitleGames">{lang === 'Русский' ? 'Рекомендуемые игры' : 'Featured Games'}</h2>
                    <div className="input-Wrapper-Context">
                      {filtredItems.length == 0 && 
                        <div  className='filtredItems'>
                          <p>{lang === 'Русский' ? 'Игры, соответствующие вашему запросу, не найдены.' : 'No games found matching your search.'}</p>
                        </div>
                      }
                      
                      <div className="card-wrapper">
                        <div className="cards" style={{justifyContent: value ? '' : 'center', marginLeft: value ? '150px' : '0'}}>
                            {GamesJson
                              .filter((obj: itemObjType) => obj.title.toLowerCase().includes(value.toLowerCase()))
                              .map((obj: itemObjType, index: number) => (
                                <>
                                    <Card key={index} id={obj.id} title={obj.title} price={obj.price} imageUrl={obj.ImageUrl} company={obj.company} 
                                    sale={obj.sale} proccentSale={obj.proccentSale}/>
                                </>
                              ))
                            }
                        </div>
                      </div>
                    </div>  
                  </div>
              </main>
            </div>
        </>
    )
}

export default Home;

export const ValueState = (state: any) => state.value.value;