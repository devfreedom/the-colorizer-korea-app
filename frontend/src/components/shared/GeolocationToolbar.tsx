// @ts-ignore
// @ts-nocheck

import PoiScopeSelector from './PoiScopeSelector'
import CurrentPosition from './CurrentPosition'

function GeolocationToolbar() {

  return (
    <div className="flex flex-row justify-between items-center h-8 px-8 mb-3 relative">
      <PoiScopeSelector />
      <CurrentPosition />
    </div>
  );
}

export default GeolocationToolbar;