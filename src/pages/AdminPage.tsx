import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, Check, X, Upload, Lock, Users, FileText, Settings, Plus } from "lucide-react";
import AdminLogin from "@/components/AdminLogin";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Mock data storage
  const [articles, setArticles] = useState([
    { id: 1, title: "Getting Started with Arduino", author: "John Doe", status: "pending", content: "Arduino is a great platform..." },
    { id: 2, title: "PCB Design Best Practices", author: "Jane Smith", status: "approved", content: "When designing PCBs..." },
    { id: 3, title: "3D Printing Materials Guide", author: "Mike Johnson", status: "rejected", content: "Different materials have..." }
  ]);

  const [users, setUsers] = useState([
    { id: 1, username: "johndoe", email: "john@example.com", role: "writer" },
    { id: 2, username: "janesmith", email: "jane@example.com", role: "admin" },
    { id: 3, username: "mikejohnson", email: "mike@example.com", role: "reader" }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "Arduino Uno Kit", price: "$25", description: "Complete starter kit", image: "arduino-kit.jpg" },
    { id: 2, name: "3D Printer Filament", price: "$20", description: "PLA filament roll", image: "filament.jpg" }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    maintenanceMode: false,
    featuredProducts: true,
    allowRegistration: true
  });

  // Modal states
  const [editingArticle, setEditingArticle] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", image: "" });

  // Article Management Functions
  const approveArticle = (id) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, status: "approved" } : article
    ));
    toast({ title: "Article approved successfully!" });
  };

  const rejectArticle = (id) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, status: "rejected" } : article
    ));
    toast({ title: "Article rejected" });
  };

  const deleteArticle = (id) => {
    setArticles(prev => prev.filter(article => article.id !== id));
    toast({ title: "Article deleted" });
  };

  const saveArticle = () => {
    if (editingArticle) {
      setArticles(prev => prev.map(article => 
        article.id === editingArticle.id ? editingArticle : article
      ));
      setEditingArticle(null);
      toast({ title: "Article updated successfully!" });
    }
  };

  // User Management Functions
  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast({ title: "User deleted" });
  };

  const saveUser = () => {
    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setEditingUser(null);
      toast({ title: "User updated successfully!" });
    }
  };

  // Product Management Functions
  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: "", price: "", description: "", image: "" });
      toast({ title: "Product added successfully!" });
    }
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast({ title: "Product deleted" });
  };

  // Settings Functions
  const updateSettings = (key, value) => {
    setSiteSettings(prev => ({ ...prev, [key]: value }));
    toast({ title: "Settings updated" });
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-space text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-nebula">Admin Portal</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your ArcadeLabs platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Article Management Card */}
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Article Management
              </CardTitle>
              <CardDescription>
                Create, edit, and manage articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Manage Articles</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Article Management</DialogTitle>
                    <DialogDescription>
                      Review, approve, reject, or edit submitted articles
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">By {article.author}</p>
                          </div>
                          <Badge variant={article.status === 'approved' ? 'default' : article.status === 'pending' ? 'secondary' : 'destructive'}>
                            {article.status}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {article.status === 'pending' && (
                            <>
                              <Button size="sm" onClick={() => approveArticle(article.id)}>
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => rejectArticle(article.id)}>
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline" onClick={() => setEditingArticle(article)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteArticle(article.id)}>
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* User Management Card */}
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Manage Users</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>User Management</DialogTitle>
                    <DialogDescription>
                      Manage user accounts, roles, and permissions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{user.username}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <Badge variant="outline" className="mt-1">{user.role}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingUser(user)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}>
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Site Settings Card */}
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Site Settings
              </CardTitle>
              <CardDescription>
                Configure platform settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Site Settings</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Site Settings</DialogTitle>
                    <DialogDescription>
                      Manage products and site-wide settings
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Product Management */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Product Management</h3>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">Add New Product</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="productName">Product Name</Label>
                              <Input
                                id="productName"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter product name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="productPrice">Price</Label>
                              <Input
                                id="productPrice"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                                placeholder="$0.00"
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="productDescription">Description</Label>
                              <Textarea
                                id="productDescription"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Product description"
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="productImage">Image URL</Label>
                              <Input
                                id="productImage"
                                value={newProduct.image}
                                onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                                placeholder="Image filename or URL"
                              />
                            </div>
                          </div>
                          <Button className="mt-4" onClick={addProduct}>
                            <Plus className="w-4 h-4 mr-1" />
                            Add Product
                          </Button>
                        </div>

                        {/* Existing Products */}
                        <div className="space-y-2">
                          <h4 className="font-medium">Existing Products</h4>
                          {products.map((product) => (
                            <div key={product.id} className="border rounded-lg p-3 flex justify-between items-center">
                              <div>
                                <h5 className="font-medium">{product.name}</h5>
                                <p className="text-sm text-muted-foreground">{product.price} - {product.description}</p>
                              </div>
                              <Button size="sm" variant="destructive" onClick={() => deleteProduct(product.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Site-wide Settings */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Site-wide Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="maintenance">Maintenance Mode</Label>
                            <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                          </div>
                          <Switch
                            id="maintenance"
                            checked={siteSettings.maintenanceMode}
                            onCheckedChange={(checked) => updateSettings('maintenanceMode', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="featured">Featured Products</Label>
                            <p className="text-sm text-muted-foreground">Show featured products section</p>
                          </div>
                          <Switch
                            id="featured"
                            checked={siteSettings.featuredProducts}
                            onCheckedChange={(checked) => updateSettings('featuredProducts', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="registration">Allow Registration</Label>
                            <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                          </div>
                          <Switch
                            id="registration"
                            checked={siteSettings.allowRegistration}
                            onCheckedChange={(checked) => updateSettings('allowRegistration', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Edit Article Modal */}
        {editingArticle && (
          <Dialog open={!!editingArticle} onOpenChange={() => setEditingArticle(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Article</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editTitle">Title</Label>
                  <Input
                    id="editTitle"
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editAuthor">Author</Label>
                  <Input
                    id="editAuthor"
                    value={editingArticle.author}
                    onChange={(e) => setEditingArticle(prev => ({ ...prev, author: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editContent">Content</Label>
                  <Textarea
                    id="editContent"
                    rows={10}
                    value={editingArticle.content}
                    onChange={(e) => setEditingArticle(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveArticle}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditingArticle(null)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editUsername">Username</Label>
                  <Input
                    id="editUsername"
                    value={editingUser.username}
                    onChange={(e) => setEditingUser(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editRole">Role</Label>
                  <Select
                    value={editingUser.role}
                    onValueChange={(value) => setEditingUser(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="writer">Writer</SelectItem>
                      <SelectItem value="reader">Reader</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveUser}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Authentication required for full access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;