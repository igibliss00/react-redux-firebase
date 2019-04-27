import React from 'react';
import styles from '../componentStyles.module.css';

const Reviews = () => {
    return (
        <div>
            <div className={styles.reviews}>
                <div className={styles.reviewer}>
                    <img src="https://source.unsplash.com/random" className={styles.lenderImg} alt=""/>
                    <div>
                        <p className={styles.reviewerName}>Michelle</p>
                        <p>April 17, 2019</p>
                    </div>
                </div>
                <hr className={styles.line}/>
                <p>I pre-ordered The Fire TV Stick and it was delivered on the release day-thanks to free 1-day shipping with my Prime Membership. Stick connects to your TV’s HDMI port. Set up was very easy - Just connect stick to power port and HDMI port of TV, enter WI-Fi password and after software update, Amazon Fire TV stick was ready to use in minutes. It even asked me if I want to set up parental controls. It asked me to press Volume Up and Down buttons which in turn successfully paired my TV to the remote and now I can control TV with Amazon remote. The stick came pre-registered to my name and Amazon Account. I didn’t need to do any account set up. I just chose my Amazon account and everything was ready in few minutes. After setup, it played a brief introduction video showing key features of Amazon Fire TV.</p>       
            </div>
            <div className={styles.reviews}>
                <div className={styles.reviewer}>
                    <img src="https://source.unsplash.com/user/liesl_leonard" className={styles.lenderImg} alt=""/>
                    <div>
                        <p className={styles.reviewerName}>Theodore M.</p>
                        <p>April 2, 2019</p>
                    </div>
                </div>
                <hr className={styles.line}/>
                <p>There are lots of applications pre-configured and you can browse and download thousands of applications and games. There is also Firefox browser support to browse internet. This Edition has 8GB of storage, a 1.7 GHz quad-core processor. It can stream movies and TV shows at 720p, 1080p HD and 2160p 4K at up to 60 fps. The compact size makes it useful for traveling as well and weight is only 54 grams. Once you connect to TV, you find that everything is laid out nicely and browsing through the content is quite user-friendly. It should be mentioned that YouTube application is not available as Google has removed support long back but you can always use Firefox or Silk browser. It’s bit of hassle but it seems feud between Amazon and Google will never end.</p>
            </div>
            <div className={styles.reviews}>
                <div className={styles.reviewer}>
                    <img src="https://source.unsplash.com/user/humantraits" className={styles.lenderImg} alt=""/>
                    <div>
                        <p className={styles.reviewerName}>Jeremy R.</p>
                        <p>March 27, 2019</p>
                    </div>
                </div>
                <hr className={styles.line}/>
                <p>Overall, this package feels best-in-class in terms of hardware capabilities and remote functionalities. Some people may lean towards Roku due to more content, but to me being a Prime Member and having few Alexa compatible devices this is definitely a winner. It simply fits well in Alexa ecosystem.
People who have used Android TV and Kodi May find that there is lesser free content and you have to pay for many streaming service. Having said that, I read that people seems to be able to install Kodi on previous Basic Edition of stick. As I said earlier, it’s not my cup of tea.</p>
            </div>
        </div>
    )
}

export default Reviews;