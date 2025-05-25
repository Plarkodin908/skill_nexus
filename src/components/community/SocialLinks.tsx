import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, ExternalLink, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
export interface SocialLinksProps {
  isPremium: boolean;
  maxLinks: number;
  showAddButton?: boolean;
}
const SocialLinks = ({
  isPremium,
  maxLinks,
  showAddButton = true
}: SocialLinksProps) => {
  const [links, setLinks] = useState([{
    id: 1,
    name: "Twitter",
    url: "https://twitter.com/johndoe"
  }, {
    id: 2,
    name: "LinkedIn",
    url: "https://linkedin.com/in/johndoe"
  }, {
    id: 3,
    name: "GitHub",
    url: "https://github.com/johndoe"
  }]);
  const [isAdding, setIsAdding] = useState(false);
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const handleAddLink = () => {
    if (!isPremium && links.length >= maxLinks) {
      toast.error("Upgrade to add more links", {
        description: "Free accounts are limited to 3 social links"
      });
      return;
    }
    if (newLinkName.trim() === "" || newLinkUrl.trim() === "") {
      toast.error("Please fill in all fields");
      return;
    }

    // Simple URL validation
    if (!newLinkUrl.startsWith("http://") && !newLinkUrl.startsWith("https://")) {
      toast.error("URL must start with http:// or https://");
      return;
    }
    const newLink = {
      id: links.length + 1,
      name: newLinkName,
      url: newLinkUrl
    };
    setLinks([...links, newLink]);
    setNewLinkName("");
    setNewLinkUrl("");
    setIsAdding(false);
    toast.success("Social link added");
  };
  const handleRemoveLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
    toast.success("Social link removed");
  };
  return <Card className="bg-forest-light border border-mint/10 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-white">Social Links</h3>
          <span className="coming-soon flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Coming Soon
          </span>
        </div>
        {showAddButton && <Button variant="ghost" className="text-mint hover:text-mint/80 hover:bg-mint/10 p-1 h-auto" onClick={() => setIsAdding(!isAdding)}>
            <PlusCircle className="h-5 w-5" />
          </Button>}
      </div>
      
      <div className="mb-4 p-4 bg-forest rounded-lg border border-mint/10">
        <p className="text-white/70 text-sm">
          This feature requires authorization and is currently in development. 
          We'll notify you when it's available!
        </p>
      </div>
      
      {isAdding && <div className="mb-4 p-4 bg-forest rounded-lg border border-mint/10">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Link Name</label>
              <Input placeholder="Instagram, Portfolio, etc." value={newLinkName} onChange={e => setNewLinkName(e.target.value)} className="bg-forest-light border-mint/20 text-white w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">URL</label>
              <Input placeholder="https://..." value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)} className="bg-forest-light border-mint/20 text-white w-full" />
            </div>
            <Button className="bg-mint hover:bg-mint/90 text-forest mt-2" onClick={handleAddLink}>
              Add Link
            </Button>
          </div>
        </div>}
      
      {links.length === 0 ? <div className="text-center py-6 text-white/60">
          <p>No social links added yet</p>
          <p className="text-sm">Add links to your social profiles</p>
        </div> : <div className="space-y-3">
          {links.map(link => <div key={link.id} className="flex items-center justify-between p-3 bg-forest rounded-lg hover:bg-forest/70 transition-colors px-[11px] py-[11px]">
              <div>
                <p className="font-medium text-white">{link.name}</p>
                
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => window.open(link.url, "_blank")} className="h-8 w-8 text-mint hover:text-mint/80 hover:bg-mint/10 px-[2px] py-[2px]">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-400/80 hover:bg-red-400/10" onClick={() => handleRemoveLink(link.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>)}
        </div>}
      
      {!isPremium && links.length >= maxLinks && <div className="mt-4 text-center">
          <p className="text-white/60 text-sm mb-2">
            You've reached the maximum of {maxLinks} social links on the free plan
          </p>
          <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10" onClick={() => window.location.href = "/pricing"}>
            Upgrade to Add More
          </Button>
        </div>}
    </Card>;
};
export default SocialLinks;