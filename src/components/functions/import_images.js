function importAll(r) {
    let images = {};
    r.keys().map( (item) => {
        images[item.replace('./', '')] = r(item); 
    });
    return images;
}

/** Pages with single picture imports:
 * Home
 * Contact -> contact_card
 */
export const LanguageFlags = importAll(require.context( '../../../images/flags', false, /\.(gif|png|jpe?g|svg)$/) );

export const storeThumbnails = importAll(require.context( '../../../images/store_thumbnails', false, /\.(png|jpe?g|svg)$/) );

export const prodLargeImages = importAll(require.context( '../../../images/prod_large/', false, /\.(gif|png|jpe?g|svg)$/) );
export const prodCarouselImages = importAll(require.context( '../../../images/prod_schematics', false, /\.(gif|png|jpe?g|svg)$/) );
export const prodTableEra = importAll(require.context( '../../../images/prod_eraEmblems', false, /\.(gif|png|jpe?g|svg)$/) );
export const prodTableUser = importAll(require.context( '../../../images/prod_userEmblems', false, /\.(gif|png|jpe?g|svg)$/) );
export const prodKitImages = importAll(require.context( '../../../images/kits/', false, /\.(gif|png|jpe?g|svg)$/) );

export const DownloadImages = importAll(require.context( '../../../images/downloads', false, /\.(gif|png|jpe?g|svg)$/) );
export const ServiceImages = importAll(require.context( '../../../images/services', false, /\.(gif|png|jpe?g|svg)$/) );
export const Service_ExampleImages = importAll(require.context( '../../../images/services/examples', false, /\.(gif|png|jpe?g|svg)$/) );
export const SpecialImages = importAll(require.context( '../../../images/special', false, /\.(gif|png|jpe?g|svg)$/) );


/*
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item); 
    });
    return images;
}
*/