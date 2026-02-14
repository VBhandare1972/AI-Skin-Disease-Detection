from tensorflow.keras.preprocessing.image import ImageDataGenerator

print("Program started")

img_size = 224
batch_size = 16

train_datagen = ImageDataGenerator(rescale=1/255)
val_datagen = ImageDataGenerator(rescale=1/255)
test_datagen = ImageDataGenerator(rescale=1/255)

train_data = train_datagen.flow_from_directory(
    'data/train',
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical'
)

val_data = val_datagen.flow_from_directory(
    'data/val',
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical'
)

test_data = test_datagen.flow_from_directory(
    'data/test',
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical'
)

print("All data loaded successfully")
