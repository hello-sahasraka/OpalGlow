import { createClient } from '@supabase/supabase-js';

const superbase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const MediaUpload = (file) => {

    const promise = new Promise(
        (resolve, reject) => {
            if (!file) {
                reject("No file selected!");
            }
            
            const fileName = Date.now() + '-' + file.name;

            superbase.storage.from('images').upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            }).then(() => {
                const url = superbase.storage.from('images').getPublicUrl(fileName).data.publicUrl;
                resolve(url);
                
            }).catch((err) => {
                reject(err);
            });
        }
    )

    return promise;
};

export default MediaUpload;
