import React, { useContext } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { FaAddressBook, FaBloggerB, FaHome, FaProjectDiagram } from "react-icons/fa";
import { SiWikimediafoundation } from "react-icons/si";
import { MdContactPhone } from "react-icons/md";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";

// Profile menu component with navigation paths
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        to: "/profile", // Path for My Profile
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        to: "/edit-profile", // Path for Edit Profile
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
        to: "/inbox", // Path for Inbox
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
        to: "/help", // Path for Help
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
        to: "/signout", // Path for Sign Out (this can be handled by logging out)
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate(); // Using the useNavigate hook
    const { user, logOut } = useContext(AuthContext);

    const closeMenu = () => setIsMenuOpen(false);

    const handleNavigation = (to) => {
        if (to === "/signout") {
            logOut(); // Handle logout logic here
        } else {
            navigate(to); // Navigate to the given path
        }
        closeMenu(); // Close the menu after navigation
    };

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-1 px-3 lg:ml-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="Profile Picture"
                        className="border border-white p-0.5"
                        src={user?.image || "https://i.ibb.co/nnWFqp9/b-Kash-payment-Process999.png"} // Use user image or default
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1 bg-white shadow-lg rounded-lg">
                {profileMenuItems.map(({ label, icon, to }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => handleNavigation(to)}  // Handle navigation on click
                            className={`flex items-center gap-2 rounded-lg py-2 px-4 text-gray-700 hover:bg-indigo-100 ${isLastItem ? "text-red-500" : ""}`}
                        >
                            {React.createElement(icon, {
                                className: `h-5 w-5 ${isLastItem ? "text-red-500" : "text-gray-500"}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal text-gray-700"
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// Nav list component with routing links
const navListItems = [
    {
        label: "Home",
        icon: FaHome,
        to: "/",
    },
    {
        label: "Projects",
        icon: FaProjectDiagram,
        to: "/projects",
    },
    {
        label: "Samadhan Foundation",
        icon: SiWikimediafoundation,
        to: "/foundation",
    },
    {
        label: "Blogs",
        icon: FaBloggerB,
        to: "/blogs",
    },
    {
        label: "About Us",
        icon: FaAddressBook,
        to: "/about",
    },
    {
        label: "Contact",
        icon: MdContactPhone,
        to: "/contact",
    },
];

function NavList() {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center justify-center">
            {navListItems.map(({ label, icon, to }, key) => (
                <Typography key={label} as="a" variant="small" color="gray" className="font-medium text-white">
                    <Link to={to}>
                        <MenuItem className="flex items-center gap-3 lg:rounded-lg px-3 py-2 hover:bg-indigo-500 transition-all ease-in-out duration-200">
                            {React.createElement(icon, { className: "h-[20px] w-[20px] text-indigo-300" })}{" "}
                            <span className="text-gray-300 font-medium">{label}</span>
                        </MenuItem>
                    </Link>
                </Typography>
            ))}
        </ul>
    );
}

// NavBar Component
export function NavBars() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const { user, logOut } = useContext(AuthContext);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setIsNavOpen(false));
    }, []);

    return (
        <Navbar className="mx-auto fixed top-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-none">
            <div className="relative mx-auto flex items-center justify-between text-white">
                <Typography as="a" href="#" className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
                    <h4 className="text-sm sm:text-lg md:text-2xl lg:text-2xl">
                        <span className="text-blue-200">Samadhan</span> <span className="text-green-200">Group</span>
                    </h4>
                </Typography>

                {/* Centered Nav List - Visible only on large devices */}
                <div className="hidden lg:flex-grow lg:flex lg:justify-center">
                    <NavList />
                </div>

                {/* Conditional Rendering for Profile Menu and Login Button */}
                <div className="flex items-center ml-auto space-x-2">
                    {user ? (
                        // Profile menu is visible if user is logged in
                        <ProfileMenu />
                    ) : (
                        // Show Login button if user is not logged in
                        <Link to={'/login'}>
                            <Button size="sm" variant="filled" color="amber" className="hover:bg-amber-600 transition-all duration-200 ">
                                <span className="sm:text-xs">Log In</span>
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Hamburger Icon for small screens */}
                <div className="sm:text-2xl text-blue-900 md:text-xl lg:hidden">
                    <IconButton
                        size="sm"
                        color="white"
                        variant="text"
                        onClick={toggleIsNavOpen}
                        className="ml-2"
                    >
                        <Bars2Icon className="h-6 w-6" />
                    </IconButton>
                </div>
            </div>

            {/* Mobile Menu */}
            <MobileNav open={isNavOpen} className="overflow-scroll bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-600">
                <NavList />
            </MobileNav>
        </Navbar>
    );
}

export default NavBars;
