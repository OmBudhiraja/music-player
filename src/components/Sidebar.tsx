import LogoImg from '../assets/logo.svg';
import ProfileImg from '../assets/profile.svg';

function Sidebar() {
  return (
    <div className="lg:h-full w-full lg:w-fit flex lg:flex-col justify-between items-center lg:items-start">
      <div className="cursor-pointer w-24 lg:w-28 xl:w-32">
        <img src={LogoImg} alt="logo" />
      </div>
      <div>
        <img src={ProfileImg} alt="" />
      </div>
    </div>
  );
}

export default Sidebar;
