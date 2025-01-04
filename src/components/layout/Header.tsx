import { Menu, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NavigationMenu } from '@/components/ui/navigation-menu';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <ImageIcon className="h-6 w-6" />
          <span className="font-bold">AI Image Editor</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-end">
          <NavigationMenu>
            <ul className="flex space-x-4">
              <li>
                <Button variant="ghost">New Image</Button>
              </li>
              <li>
                <Button variant="ghost">Upload</Button>
              </li>
              <li>
                <Button variant="ghost">History</Button>
              </li>
            </ul>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden flex-1 justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4">
                <Button variant="ghost">New Image</Button>
                <Button variant="ghost">Upload</Button>
                <Button variant="ghost">History</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}