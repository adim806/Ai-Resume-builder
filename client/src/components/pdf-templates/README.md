# PDF Templates - React PDF Renderer

This directory contains PDF versions of resume templates using `@react-pdf/renderer` for high-quality PDF generation.

## 📁 Structure

- `ProfessionalTemplatePDF.jsx` - PDF version of Professional template
- `ClassicTemplatePDF.jsx` - PDF version of Classic template
- `index.jsx` - Export file with template selector function

## 🎯 How It Works

### Preview (HTML)
The live preview in the app uses the regular HTML templates from `components/templates/` for fast, interactive editing with full styling support.

### Download (PDF)
When users click "Download", the system:
1. Uses the PDF template version from this directory
2. Generates a high-quality PDF using `@react-pdf/renderer`
3. Downloads the file with proper formatting at 300 DPI

## ✨ Benefits

- **Higher Quality**: 300 DPI resolution (vs ~96 DPI from window.print())
- **Consistent Output**: Same result across all browsers
- **Better Fonts**: Crisp text rendering without blur
- **Professional**: Production-ready PDF documents

## 🔧 Adding New Templates

To add a new PDF template:

1. Create a new file: `YourTemplatePDF.jsx`
2. Import React PDF components: `Document, Page, Text, View, StyleSheet`
3. Create styles using `StyleSheet.create()`
4. Build your template using PDF components
5. Export the component
6. Add to `index.jsx` template selector

## 📝 Example Structure

```jsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const YourTemplatePDF = ({ data, accentColor }) => {
    const styles = StyleSheet.create({
        page: { padding: 32 },
        // ... more styles
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text>{data.personal_info?.full_name}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default YourTemplatePDF;
```

## 🎨 Important Notes

- PDF components are different from HTML/React components
- Use `StyleSheet.create()` for styling (similar to React Native)
- No CSS classes - all styling is inline via style prop
- Limited layout capabilities compared to HTML/CSS
- Images must be URLs (not File objects)
- HTML content needs to be stripped of tags

## 📚 Resources

- [React PDF Documentation](https://react-pdf.org/)
- [Styling Guide](https://react-pdf.org/styling)
- [Components API](https://react-pdf.org/components)

