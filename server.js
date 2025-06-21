import app from './server/app.js';
import env from './server/Configs/envConfig.js'
import connectDB from './server/Configs/database.js';
//import {saveCountriesIndividually } from './server/seeds/saveCountries.js'
import {userSeed} from './server/seeds/userSeed.js'



app.listen(env.Port, async() => {
    try {
        await connectDB()
        //await saveCountriesIndividually ()
        await userSeed()
        console.log(`Server is running on http://localhost:${env.Port}\nServer in ${env.Status}`);
        if(env.Status === 'development'){
      console.log(`Swagger: Vea y pruebe los endpoints en http://localhost:${env.Port}/api-docs`)
    }
    } catch (error) {
        throw error;
    }
});