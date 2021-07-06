import NavFooterItems from "./NavFooterItems";
import {CogIcon} from '@heroicons/react/outline'
import Toggle from "./Toggle";
function NavFooter() {
    return (
        <div className="grid grid-flow-col grid-rows-1 mt-28 bottom-4 border-t border-[#48ac32] w-full pt-2">
            {/* Footer Items */}
            <div className="flex flex-col items-center text-xs"><NavFooterItems icon={<CogIcon className="h-7 mb-1"/>} title="Settings"/></div>
            <div className="flex flex-col items-center"><Toggle name=""/> <span className="text-xs mt-2">Dark Mode</span></div>
        </div>
    )
}

export default NavFooter
