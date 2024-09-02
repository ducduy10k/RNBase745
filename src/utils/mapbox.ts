declare interface Feature {
    "type": "Feature", "properties": {[key: string]: any}, "geometry": { "type": "MultiPolygon" | "Polygon" | "Point", "coordinates": any[]}
}

export function getBoundbox(feature: Feature) {
    let xMax: number | undefined, xMin: number | undefined, yMax: number| undefined, yMin: number | undefined;
    switch(feature.geometry.type) {
        case 'MultiPolygon': {
            feature.geometry.coordinates.forEach((coordinates: any[]) => {
                coordinates.forEach((lstCoor) => {
                    lstCoor.forEach((coordinate: any) => {
                    if (!xMax || coordinate[0] > xMax) {
                        xMax = coordinate[0];
                    }
                    if (!xMin || coordinate[0] < xMin) {
                        xMin = coordinate[0];
                    }
                    if (!yMax || coordinate[1] > yMax) {
                        yMax = coordinate[1];
                    }
                    if (!yMin || coordinate[1] < yMin) {
                        yMin = coordinate[1];
                    }
                    })
                    
                  
                })
            })
            break;
        }

        default: {

        }
    }

    return {xMax, yMax, xMin, yMin }
}