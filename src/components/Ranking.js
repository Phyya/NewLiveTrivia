import Nav from "./NavLink"
import Header from "./Header"
const Ranking = () => {
    return (
        <div className="container-fluid container">
            <Header/>
        <div className="ranking">
            <div className="ranking__btn-sec">
                <button className="btn ranking-btn">
                    This Week
                </button>
                <button className="btn no-bg-btn">
                    All Time
                </button>
            </div>
            <div className="ranking__top-3">
               
                <div className="ranking__top-3__users">
                   <div className="ranking__top-3__users__profile-photo">
                    <div className="ranking__top-3__users__profile-photo--1">
                        <img src="../img/1st.svg" alt="pic of a person"/>
                    </div>
                    <span className="first-position">
                        1
                    </span>
                   </div> 
                   <div className="ranking__top-3__users__name">
                       <p className="ranking-userNamne">
                           Michael Scoutt
                       </p>
                   </div>
                   <div className="amountEarnedByTheUser">
                       <span><img src="../img/naira.svg" alt=""/></span>
                       <span className="totalAmountEarned">1000</span>
                   </div>
                </div>



        
                <div className="ranking__top-3__users">
                    <div className="ranking__top-3__users__profile-photo">
                        <div className="ranking__top-3__users__profile-photo--2">
                            <img src="../img/2nd.svg" alt="pic of a person" srcset=""/>
                        </div>
                        <span className="second-position">
                            2
                        </span>
                       </div> 
                       <div className="ranking__top-3__users__name">
                           <p className="ranking-userNamne">
                               Mary Klan
                           </p>
                       </div>
                       <div className="amountEarnedByTheUser">
                           <span><img src="../img/naira.svg" alt=""/></span>
                           <span className="totalAmountEarned">700</span>
                       </div>
                </div>



            
                <div className="ranking__top-3__users">
                    <div className="ranking__top-3__users__profile-photo">
                        <div className="ranking__top-3__users__profile-photo--3">
                            <img src="../img/3rd.svg" alt="pic of a person" srcset=""/>
                        </div>
                        <span className="third-position">
                            3
                        </span>
                       </div> 
                       <div className="ranking__top-3__users__name">
                           <p className="ranking-userNamne">
                               Maurice J
                           </p>
                       </div>
                       <div className="amountEarnedByTheUser">
                           <span><img src="../img/naira.svg" alt=""/></span>
                           <span className="totalAmountEarned">600</span>
                       </div>
                </div>
            </div>


          

                <div className="ranking__fourthPlace-bottom__positions">
                    <div className="ranking-position">
                        <span className="ranking-position__stand">4</span>
                        <div className="ranking-ppAndName">
                            <span className="ranking-pic"><img src="../img/4th.png" alt=""/></span>
                            <span className="userName">Philip</span>
                        </div>
                    </div>
                    <div className="ranking__amount-earned">
                        <div className="amountEarnedByTheUser">
                           <span><img src="../img/naira.svg" alt=""/></span>
                           <span className="totalAmountEarned">100</span>
                       </div>
                    </div>
                </div>


                <div className="ranking__fourthPlace-bottom__positions">
                    <div className="ranking-position">
                        <span className="ranking-position__stand">5</span>
                        <div className="ranking-ppAndName">
                            <span className="ranking-pic"><img src="../img/4th.png" alt=""/></span>
                            <span className="userName">Philip</span>
                        </div>
                    </div>
                    <div className="ranking__amount-earned">
                        <div className="amountEarnedByTheUser">
                           <span><img src="../img/naira.svg" alt=""/></span>
                           <span className="totalAmountEarned">100</span>
                       </div>
                    </div>
                </div>


                <div className="ranking__fourthPlace-bottom__positions">
                    <div className="ranking-position">
                        <span className="ranking-position__stand">6</span>
                        <div className="ranking-ppAndName">
                            <span className="ranking-pic"><img src="../img/4th.png" alt=""/></span>
                            <span className="userName">Philip</span>
                        </div>
                    </div>
                    <div className="ranking__amount-earned">
                        <div className="amountEarnedByTheUser">
                           <span><img src="../img/naira.svg" alt=""/></span>
                           <span className="totalAmountEarned">100</span>
                       </div>
                    </div>
                </div>



                <div className="ranking__fourthPlace-bottom__positions">
                    <div className="ranking-position">
                        <span className="ranking-position__stand">7</span>
                        <div className="ranking-ppAndName">
                            <span className="ranking-pic"><img src="../img/4th.png" alt=""/></span>
                            <span className="userName">Philip</span>
                        </div>
                    </div>
                    <div className="ranking__amount-earned">
                        <div className="amountEarnedByTheUser">
                           <span><img src="../img/naira.svg" alt=""/></span>
                           <span className="totalAmountEarned">100</span>
                       </div>
                    </div>
                </div>


                <div className="ranking__fourthPlace-bottom__positions">
                    <div className="ranking-position">
                        <span className="ranking-position__stand">8</span>
                        <div className="ranking-ppAndName">
                            <span className="ranking-pic"><img src="../img/4th.png" alt=""/></span>
                            <span className="userName">Philip</span>
                        </div>
                    </div>
                    <div className="ranking__amount-earned">
                        <div className="amountEarnedByTheUser">
                           <span><img src="../img/naira.svg" alt=""/></span>
                           <span className="totalAmountEarned">100</span>
                       </div>
                    </div>
                </div>


                <div className="ranking__fourthPlace-bottom__positions">
                    <div className="ranking-position">
                        <span className="ranking-position__stand">9</span>
                        <div className="ranking-ppAndName">
                            <span className="ranking-pic"><img src="../img/4th.png" alt=""/></span>
                            <span className="userName">Philip</span>
                        </div>
                    </div>
                    <div className="ranking__amount-earned">
                        <div className="amountEarnedByTheUser">
                           <span><img src="../img/naira.svg" alt=""/></span>
                           <span className="totalAmountEarned">100</span>
                       </div>
                    </div>
                </div>

                <div className="ranking__fourthPlace-bottom__positions">
                    <div className="ranking-position">
                        <span className="ranking-position__stand">10</span>
                        <div className="ranking-ppAndName">
                            <span className="ranking-pic"><img src="../img/4th.png" alt=""/></span>
                            <span className="userName">Philip</span>
                        </div>
                    </div>
                    <div className="ranking__amount-earned">
                        <div className="amountEarnedByTheUser">
                           <span><img src="../img/naira.svg" alt=""/></span>
                           <span className="totalAmountEarned">100</span>
                       </div>
                    </div>
                </div>
            </div>
            <Nav/>
        </div>
    
  
    
    )
}

export default Ranking
