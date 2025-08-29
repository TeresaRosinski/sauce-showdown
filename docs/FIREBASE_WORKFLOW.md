# Firebase Development & Deployment Workflow

## 🚀 Quick Start

Your app is configured for **Firebase Hosting** with an optimized development workflow!

**Current project**: `sauce-showdown` (main production)

## 💻 Development Commands

### **Daily Development**
```bash
# Start development server with hot reload
npm run dev
# → Opens http://localhost:3000 with live editing
```

### **Local Testing (Production-like)**
```bash
# Build and serve locally (exactly like Firebase hosting)
npm run firebase:serve
# → Tests your app exactly as it will appear on Firebase
```

### **Quick Preview**
```bash
# Serve the last build locally
npm run start
# or
npm run preview
```

## 🔥 Firebase Deployment Commands

### **Main Production Deployment**
```bash
# Build and deploy to your main Firebase site
npm run deploy
# → Deploys to: https://sauce-showdown.web.app
```

### **Quick Deploy (Skip cache)**
```bash
# Force deploy (useful if having caching issues)
npm run deploy:quick
```

### **Preview Deployment** (Recommended for testing)
```bash
# Deploy to a temporary preview URL for testing
npm run deploy:preview
# → Creates a temporary URL like: https://sauce-showdown--preview-abc123.web.app
```

## 🔄 Recommended Development Workflow

### **For New Features:**
1. **Develop**: `npm run dev` 
2. **Test locally**: `npm run firebase:serve`
3. **Preview deploy**: `npm run deploy:preview`
4. **Production deploy**: `npm run deploy`

### **For Quick Fixes:**
1. **Develop**: `npm run dev`
2. **Deploy**: `npm run deploy`

### **For Major Changes:**
1. **Develop**: `npm run dev`
2. **Test locally**: `npm run firebase:serve`
3. **Preview deploy**: `npm run deploy:preview` (share with team/test)
4. **Production deploy**: `npm run deploy`

## 🎯 Firebase Project Setup

**Current configuration:**
- **Project**: `sauce-showdown` 
- **Hosting URL**: https://sauce-showdown.web.app
- **Build output**: `/out/` directory
- **Database**: Firestore (for voting data)

## 📱 Key Features Working

✅ **Static Export**: Optimized for Firebase hosting  
✅ **Firebase Auth**: Session management  
✅ **Firestore**: Real-time voting data  
✅ **Hot Reload**: Fast development iteration  
✅ **Preview Deployments**: Safe testing before production  

## 🛠️ Advanced Commands

### **Firebase Emulators** (for testing database locally)
```bash
npm run firebase:emulators
# → Runs local Firebase services for testing
```

### **Database Population**
```bash
npm run populate-db
# → Populates Firestore with sample data
```

### **Manual Firebase Commands**
```bash
# Check what you're about to deploy
firebase hosting:channel:list

# Delete a preview deployment
firebase hosting:channel:delete preview

# View deployment history
firebase projects:list
```

## ⚡ Pro Tips

### **Fast Development Loop:**
1. Keep `npm run dev` running in one terminal
2. When ready to test: `npm run deploy:preview` 
3. Share preview URL with team/stakeholders
4. When approved: `npm run deploy`

### **Emergency Rollback:**
```bash
# List recent deployments
firebase hosting:releases:list --site sauce-showdown

# Rollback to previous version
firebase hosting:rollback --site sauce-showdown
```

### **Performance Monitoring:**
- Firebase automatically monitors your site performance
- Check Firebase Console → Hosting for analytics

## 🔍 Troubleshooting

### **Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next out
npm run build
```

### **Firebase Auth Issues:**
- Check `config/firebase/firebase-admin-key.json` exists
- Verify Firebase project is correct: `firebase projects:list`

### **Deployment Stuck:**
```bash
# Force redeploy
npm run deploy:quick
```

## 📊 Monitoring Your App

**Firebase Console**: https://console.firebase.google.com/project/sauce-showdown
- **Hosting**: View deployments, performance
- **Firestore**: Monitor database usage
- **Analytics**: User engagement data

## 🎉 Next Steps

Your workflow is optimized for:
- ⚡ **Fast development** with hot reload
- 🧪 **Safe testing** with preview deployments  
- 🚀 **Quick production deploys**
- 📈 **Real-time monitoring** with Firebase

**Happy coding!** 🎮
